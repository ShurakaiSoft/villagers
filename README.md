villagers
=========


# Overview

A tool to randomly create an AD&D role playing character. 

# Motivation. 

The theory behind this application is, that given a large enough pool of people, you can find exactly the kind of 
character you are looking for. Characters are randomly generated and adhere strictly to the rules of character 
generation.

## Use Case

A party of adventurers are down one member. They try to recruit a replacement from the local population. The town
the find themselves in has a population of 25000 people. This application randomly generates 25000 characters and 
then allows ways to filter the results and provide a short list of possible candidates. For example if the party
need a replacement mage, it will only show mage candidates. 

# Development

This will be a client-side JavaScript based SPA. 


# Interface 

There are two parts to the application. The first part generates a population. And the second provides some filtering
options, for creating a short list of candidates.

# Development Roadmap

## Milestone 1 (Minimum Viable Product)

* Adventurers consist of a set of 6 attributes (str, dex, con, int, wis and chr)
* populate a village of a given size.
* Search village based on the 6 attributes, average and total.
* User configurable top x candidates shown.

## Future Milestones

These items haven't been scheduled for development. Just a list of ideas and 
extensions for future development.

* Add more detail to Adventurers. eg (Class, Race, Age, Gender, Level etc)
* Filter candidates on new adventurer details.
* Allow weighting of filter attributes, eg str is 3x more important than dex.
* Options to customize village, eg Dwarven village.
