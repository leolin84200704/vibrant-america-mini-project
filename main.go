package main

import (
	"context"
	"log"
	"fmt"
	// "os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type State struct {
	Name string `json:"name"`
}

var collection *mongo.Collection
var ctx = context.TODO()

func mongodb_connect() *mongo.Client{
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

func get_state_names(client *mongo.Client) []State{
	collection = client.Database("states").Collection("state_names")
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var state_names []State
	for cursor.Next(ctx) {
		var state State
		err := cursor.Decode(&state)
		if err != nil {
			log.Fatal(err)
		}
		state_names = append(state_names, state)
	}
	if err:= cursor.Err(); err != nil {
		log.Fatal(err)
	}
	return state_names
}


func main() {
	fmt.Printf("hi")
	client := mongodb_connect()
	// fmt.Printf("State: %s\n", client)
	state_names := get_state_names(client)
	for _, state := range state_names {
		fmt.Printf("State: %s\n", state.Name)
	}
}