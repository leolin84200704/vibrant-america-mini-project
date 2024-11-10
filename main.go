package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/graphql-go/graphql"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type State struct {
	Name string `json:"name"`
}

var collection *mongo.Collection
var ctx = context.TODO()

func mongodb_connect() *mongo.Client {
	clientOptions := options.Client().ApplyURI("mongodb://admin:admin@localhost:27017")
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	return client
}

var state_type = graphql.NewObject(graphql.ObjectConfig{
	Name: "State",
	Fields: graphql.Fields{
		"name": &graphql.Field{
			Type: graphql.String,
		},
	},
})

var root_query = graphql.NewObject(graphql.ObjectConfig{
	Name: "root_query",
	Fields: graphql.Fields{
		"states": &graphql.Field{
			Type: graphql.NewList(state_type),
			Args: graphql.FieldConfigArgument{
				"prefix": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: func(params graphql.ResolveParams) (interface{}, error) {
				client := mongodb_connect()
				collection = client.Database("states").Collection("state_names")

				prefix, _ := params.Args["prefix"].(string)

				cursor, err := collection.Find(ctx, bson.M{})
				if err != nil {
					return nil, err
				}
				defer cursor.Close(ctx)

				var state_names []State
				for cursor.Next(ctx) {
					var state State
					if err := cursor.Decode(&state); err != nil {
						return nil, err
					}
					if strings.HasPrefix(strings.ToLower(state.Name), strings.ToLower(prefix)) {
						state_names = append(state_names, state)
					}
				}
				return state_names, nil
			},
		},
	},
})

var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
	Query: root_query,
})

func execute_query(w http.ResponseWriter, r *http.Request) {
	var params struct {
		Query     string                 `json:"query"`
		Variables map[string]interface{} `json:"variables"`
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&params); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result := graphql.Do(graphql.Params{
		Schema:         schema,
		RequestString:  params.Query,
		VariableValues: params.Variables,
	})

	w.Header().Set("Content-Type", "application/json")
	if result.HasErrors() {
		log.Println(result.Errors)
		http.Error(w, "Error executing GraphQL query", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(result)
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/graphql", execute_query).Methods("POST")

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"POST"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	log.Println("Server starting on :8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler.Handler(router)))
}