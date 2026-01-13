---
title: Workshop - Detailed Talking Script
author:
  - Jon Marien
created: 2025-03-27
published: 2025-03-27
tags:
  - bearhacks2025
---

| Title                              | Author                       | Created        | Published      | Tags                               |
| ---------------------------------- | ---------------------------- | -------------- | -------------- | ---------------------------------- |
| Workshop - Detailed Talking Script | <ul><li>Jon Marien</li></ul> | March 27, 2025 | March 27, 2025 | [[#bearhacks2025\|#bearhacks2025]] |

---
# CLI Concept Mashup Generator Workshop - Detailed Talking Script

## Pre-Workshop Setup (5 minutes)

*[As participants arrive/connect]*

"Welcome everyone! Before we dive into our Perplexity API workshop, let's make sure we all have the necessary tools installed. You'll need Python on your machine - version 3.6 or higher works best.

First, let's install the requests library which we'll use to communicate with the Perplexity API. Open your terminal and type:

```
pip install requests
```

Next, we need to set up our Perplexity API keys. If you haven't already signed up for an API key, please do so now at perplexity.ai.

Once you have your key, you'll need to set it as an environment variable. In your terminal, enter:

```
export PERPLEXITY_API_KEY="your_api_key_here"
```

For Windows users, you'll use 'set' instead of 'export'.

Let's verify your setup by running a quick test command:

```
echo $PERPLEXITY_API_KEY
```

You should see your API key displayed. Great! We're ready to start building our application."

## Introduction (5 minutes)

"Today we're going to build something called a 'Concept Mashup Generator' using the Perplexity API. Instead of making a typical chatbot, we're creating a tool that demonstrates how AI can combine disparate concepts to generate innovative ideas.

The Perplexity API is particularly good at this kind of creative task because it can understand complex relationships between different concepts and generate coherent, structured responses.

Here's a quick demo of what our finished product will do..."

*[Run a quick demonstration of the final script]*

```
python concept_mashup.py --random
```

"As you can see, our tool just combined [concept 1] and [concept 2] to create this innovative idea. By the end of this workshop, you'll be able to build this yourself and customize it for your own projects.

What makes this project interesting is that it shows how the Perplexity API can be used for creative ideation and structured output, not just answering questions or generating text. This has applications in fields like product innovation, education, creative writing, and more."

## Building the Application (25 minutes)

### Step 1: Basic Structure and Imports (3 minutes)

"Let's start by creating a new Python file called `concept_mashup.py`. Open that in your favorite editor, and we'll begin by importing the necessary libraries and setting up our API key.

```python
import argparse
import random
import requests
import os

API_KEY = os.environ.get("PERPLEXITY_API_KEY")
if not API_KEY:
    print("Error: API key is not set. Please set your Perplexity API key.")
    exit(1)
```

The first four imports give us what we need: argparse for command-line arguments, random for selecting concepts, requests for API calls, and os for environment variables.

Then we're checking if the API key exists. This is important because without it, we can't make any API calls, so we exit with an error message rather than letting the script fail later."

### Step 2: Define Concept Lists (2 minutes)

"Next, let's define some concept categories that our generator will use. Add these lists to your script:

```python
tech_concepts = ["AI", "Blockchain", "IoT", "VR", "Robotics", "3D Printing", "Quantum Computing"]
everyday_objects = ["Coffee Mug", "Bicycle", "Umbrella", "Backpack", "Headphones", "Toothbrush", "Sneakers"]
nature_elements = ["Forest", "Ocean", "Mountain", "River", "Desert", "Clouds", "Sunlight"]
social_concepts = ["Education", "Healthcare", "Transportation", "Communication", "Entertainment", "Finance", "Sustainability"]
```

These lists give our tool a diverse range of concepts to work with. Of course, you could expand these or add entirely new categories based on your interests. For example, you might add categories for historical periods, art movements, or scientific disciplines."

### Step 3: Create the API Function (10 minutes)

"Now, let's create the core function that will communicate with the Perplexity API:

```python
def generate_fusion_idea(concept1, concept2):
    url = "https://api.perplexity.ai/chat/completions"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    prompt = f"""Generate an innovative idea or invention that combines {concept1} and {concept2}.
    Provide a brief description and at least one potential real-world application.
    Format the response as follows:
    Fusion Concept: [Name of the fusion concept]
    Description: [2-3 sentence description]
    Application: [1-2 sentence real-world application]
    """

    data = {
        "model": "sonar-pro",
        "messages": [
            {"role": "system", "content": "You are a creative AI assistant specializing in generating innovative ideas."},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 500,
        "temperature": 0.7
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        return f"An error occurred: {e}"
```

This function is where the magic happens. Let me break down the key components:

First, we set the API endpoint URL and headers, including our API key for authentication.

Next, we craft a prompt that tells the API exactly what we want. Notice how specific our instructions are - we're not just asking for 'ideas,' but for a structured response with a name, description, and application. This is a technique called 'prompt engineering,' and it's crucial for getting consistent, useful responses.

In the data payload, we specify:

- `sonar-pro` as our model.
- A system message that sets the context.
- Our user prompt with the concepts to combine.
- Parameters like max_tokens and temperature to control the length and creativity of the response.

Finally, we have error handling to catch any API issues and return a meaningful error message instead of crashing.

This function demonstrates one of the most important skills in working with AI APIs: crafting effective prompts that elicit the exact type of response you need."

### Step 4: Implement Main Function (10 minutes)

"Now let's create the main function to handle the command-line interface:

```python
def main():
    parser = argparse.ArgumentParser(description="Generate innovative ideas by combining concepts using the Perplexity API")
    parser.add_argument("--random", action="store_true", help="Generate ideas using random concepts")
    parser.add_argument("--concept1", type=str, help="First concept")
    parser.add_argument("--concept2", type=str, help="Second concept")
    parser.add_argument("--category1", type=str, choices=["tech", "everyday", "nature", "social"], 
                        help="Category for first concept if using random")
    parser.add_argument("--category2", type=str, choices=["tech", "everyday", "nature", "social"], 
                        help="Category for second concept if using random")
    parser.add_argument("--custom", action="store_true", help="Enter custom concepts interactively")
    args = parser.parse_args()

    if args.custom:
        print("\n=== Custom Concept Entry ===")
        concept1 = input("Enter your first concept: ")
        concept2 = input("Enter your second concept: ")
    elif args.random:
        category_map = {
            "tech": tech_concepts,
            "everyday": everyday_objects,
            "nature": nature_elements,
            "social": social_concepts
        }
        
        category1 = category_map.get(args.category1, random.choice(list(category_map.values())))
        category2 = category_map.get(args.category2, random.choice(list(category_map.values())))
        
        concept1 = random.choice(category1)
        concept2 = random.choice(category2)
    else:
        concept1 = args.concept1
        concept2 = args.concept2

    if not concept1 or not concept2:
        print("Please provide both concepts, use the --random flag, or use the --custom flag.")
        return

    print(f"\nGenerating innovative idea combining '{concept1}' and '{concept2}'...\n")
    fusion_idea = generate_fusion_idea(concept1, concept2)
    print("=" * 50)
    print(fusion_idea)
    print("=" * 50)

if __name__ == "__main__":
    main()
```

Here, we're using argparse to create a flexible command-line interface with multiple options:

- `--random` to generate ideas using random concepts.
- `--concept1` and `--concept2` for specifying particular concepts.
- `--category1` and `--category2` to select from specific categories.
- `--custom` for interactive input.

The logic then determines which method the user chose and selects concepts accordingly. For random selection, we create a dictionary mapping category names to our concept lists, which makes the code cleaner and more maintainable.

Finally, we call our API function and print the result with some formatting to make it look nice.

This approach gives users multiple ways to interact with our tool, which makes it more flexible and user-friendly. And that's it - our script is complete!"

## Testing and Demonstration (5 minutes)

"Now, let's save our file and test it with different options:

First, let's try fully random concepts:

```
python concept_mashup.py --random
```

[After running] "Great! We got a mashup between [concept1] and [concept2], creating this innovative idea for [fusion concept].

Now, let's try specifying categories:

```
python concept_mashup.py --random --category1 tech --category2 nature
```

[After running] "This time we combined a tech concept with a nature element, resulting in [fusion concept]. This demonstrates how we can control the types of concepts we're combining.

Let's try specifying exact concepts:

```
python concept_mashup.py --concept1 "Space Travel" --concept2 "Gardening"
```

[After running] "Here we get a specific combination we're interested in, showing how the tool can be used for targeted ideation.

Finally, let's try the interactive custom mode:

```
python concept_mashup.py --custom
```

[When prompted] Let's enter "Underwater Photography" for the first concept and "Social Media" for the second.

[After running] "This custom option allows users to enter any concepts they can think of, which makes the tool incredibly flexible for creative brainstorming sessions."

## Wrap-up and Q\&A (5 minutes)

"To summarize what we've accomplished today:

1. We've built a CLI tool that harnesses the power of the Perplexity API for creative ideation.
2. We've learned how to craft effective prompts to get structured, useful responses.
3. We've implemented flexible interaction methods to make our tool accessible in different scenarios.

The skills you've learned today - API integration, prompt engineering, and CLI design - can be applied to many other AI projects.

Some ways you could extend this project:

- Save generated ideas to a file for later reference.
- Add a scoring or rating system for ideas.
- Implement a more sophisticated prompt that generates multiple ideas at once.
- Create domain-specific versions for particular industries or use cases.

Are there any questions about what we've covered today?

 ## Address ANY Questions

Thank you all for participating! I hope this workshop has given you a good starting point for exploring the Perplexity API in your own projects. The code will be available on our repository, along with additional resources and documentation on the Perplexity API."