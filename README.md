# Educatus - A flexible AI Tool Dashboard for everyone

<img src="https://imgur.com/ANBui6s.png" width="440" height="140">

[Demo Video](https://www.youtube.com/watch?v=fx683eA0Z7A)

This project was produced for UF AI Days 2022 by Gabriel Brosula, Matthew Hibb, Patrick Lehman, Justin Ho, and Kyle Dampier.

### What it does

Educatus is a customizable AI Dashboard of up to 6 different AI/Data exploration tools that allow a user to analyze many bodies of text efficiently and features various other functionalities. Educatus features the following 6 tools:

* **Reword Sentence**: Reconstruct sentences using simpler vocabulary for non-technical audiences or create grammatically more complex sentence structures. This tool helps reduce inequalities.
* **Text Analyzer**: The text analyzer is an important tool for academic research, as it can help to identify and define the most important topics within a text using unique highlighting and create Wikipedia blurbs This tool helps address quality education
* **Analogy Generator**: Given a topic and a piece of text, the analogy generator attempts to explain the topic's relationship using an analogy based on a target text. This tool helps address quality education
* **Guided Notes**: Generate a PDF file of text input with various entities replaced with fill-in-the-blanks, allowing a person to practice various text-based content for study purposes. This tool helps address quality education
* **Compare Country**: Use data from the Global Economy database to compare over 200 countries in terms of their Happiness Index, GDP, and Cost of Living Index, among 300+ other metrics. This tool helps address health and well-being
* **QA Generation**: Generate Question/Answer pairs from bodies of text then selectively generate a quiz using the content to test your knowledge. This tool helps address quality education

[Devpost Link](https://devpost.com/software/educatus-2gqlj0)
</br>
## Dashboard Layout

<img src="https://imgur.com/yOXwqYr.png" width="820" height="590">

### Example
<img src="https://imgur.com/9v0kJzJ.png" width="820" height="590">

## How we built it

Educatus is made up of two separate microservices. A Next.js Web application frontend that features the actual UI dashboard functionality and login authentication (using Google Firebase), and another FastAPI backend service that services API routes for each tool functionality that can be called by the frontend service. The tools used OpenAI for open-ended language tasks, a large pretrained transformer for Question Generation, and spaCy for lower level language tasks, like entity and part of speech detection.
