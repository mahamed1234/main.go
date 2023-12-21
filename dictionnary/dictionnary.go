package dictionary

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
)

type Dictionary struct {
	filename string
	commands chan func(map[string]string)
}

func NewDictionary(filename string) *Dictionary {
	dict := &Dictionary{
		filename: filename,
		commands: make(chan func(map[string]string)),
	}
	go dict.start()
	return dict
}

func (d *Dictionary) start() {
	entries := d.loadEntries()

	for {
		select {
		case command := <-d.commands:
			command(entries)
			d.saveEntries(entries)
		}
	}
}

func (d *Dictionary) Add(word, definition string) {
	d.commands <- func(entries map[string]string) {
		entries[word] = definition
	}
}

func (d *Dictionary) Get(word string) (string, bool) {
	entries := d.loadEntries()
	definition, found := entries[word]
	return definition, found
}

func (d *Dictionary) Remove(word string) {
	d.commands <- func(entries map[string]string) {
		delete(entries, word)
	}
}

func (d *Dictionary) List() []string {
	entries := d.loadEntries()
	var result []string
	for word, definition := range entries {
		result = append(result, fmt.Sprintf("%s: %s", word, definition))
	}
	sort.Strings(result)
	return result
}

func (d *Dictionary) loadEntries() map[string]string {
	entries := make(map[string]string)
	data, err := ioutil.ReadFile(d.filename)
	if err != nil {

		return entries
	}
	err = json.Unmarshal(data, &entries)
	if err != nil {
		panic(err)
	}
	return entries
}

func (d *Dictionary) saveEntries(entries map[string]string) {
	data, err := json.Marshal(entries)
	if err != nil {
		panic(err)
	}

	err = ioutil.WriteFile(d.filename, data, 0644)
	if err != nil {
		panic(err)
	}
}

func (d *Dictionary) Close() {
	close(d.commands)
}
