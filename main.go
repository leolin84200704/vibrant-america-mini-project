package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"github.com/gorilla/mux"
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

func get_state_names(w http.ResponseWriter, r *http.Request) {
	client := mongodb_connect()
	collection = client.Database("states").Collection("state_names")

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var state_names []State
	for cursor.Next(ctx) {
		var state State
		if err := cursor.Decode(&state); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		state_names = append(state_names, state)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(state_names)
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/states", get_state_names).Methods("GET")
}