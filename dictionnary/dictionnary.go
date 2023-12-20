package dictionary

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sort"
)

type Dictionary struct {
	filename string
}

func NewDictionary(filename string) *Dictionary {
	return &Dictionary{
		filename: filename,
	}
}

func (d *Dictionary) Add(word, definition string) {
	entries := d.loadEntries()
	entries[word] = definition
	d.saveEntries(entries)
}

func (d *Dictionary) Get(word string) (string, bool) {
	entries := d.loadEntries()
	definition, found := entries[word]
	return definition, found
}

func (d *Dictionary) Remove(word string) {
	entries := d.loadEntries()
	delete(entries, word)
	d.saveEntries(entries)
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
