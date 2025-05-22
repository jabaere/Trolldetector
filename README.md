
# Trolls Detector

This app uses AI-powered image, comment, and name analysis to estimate profile authenticity.
It analyzes profile pictures, names, and comments using custom rules to detect possible troll profiles.

Face Analysis: Uses DeepFace and Torch to detect emotions, age, and facial traits.

Comment Analysis: Utilizes Google's Perspective API to assess toxicity, sentiment, and language impact..

Georgian Name Analysis
Surname Pattern Recognition: Detects common Georgian endings like -shvili, -dze, -ia, -ani, -uri. Works with Georgian script and Latin versions.
First Name Analysis: Identifies typical Georgian first name patterns and adjusts troll score accordingly.
Script Detection: Automatically detects if the name uses Georgian or Latin script to apply the right rules.

⚠️ Georgian comments are translated using Google Translate API. Accuracy may vary — for better results, please translate to English manually before input using Google Translate or another reliable service.

⚠️ This system is not 100% accurate. A high troll score does not guarantee the profile is fake — false positives are possible.




## Environment Variables

If you want to analyze comments, you will need to add the following environment variables to your .env file

`PERSPECTIVE_API_KEY`

You can get it from https://perspectiveapi.com/


## Run Locally

Clone the project

```bash
  git clone https://github.com/jabaere/Trolldetector.git
```
For Frontend:

Go to the Frontend directory

```bash
  cd Trolldetector/Frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
For Backend:
Go to the backend directory

```bash
  cd Trolldetector/backend
```
Install dependencies

```bash
  pip install -r requirements.txt

```
Start the server

```bash
  uvicorn main:app --reload --port 8080

```

Or, if you prefer a simplified setup, just download the Docker image:
```bash
  docker pull bytebrief/trolldetector:1.0.0

```
and run it 

```bash
  docker run --env-file .env -p 8000:8000 bytebrief/trolldetector:1.0.0


```


## Screenshots

![Troll-detector-App-05-22-2025_10_53_PM](https://github.com/user-attachments/assets/e90395e9-9a20-4d86-a17f-a8cf84816f24)
![Troll-detector-text](https://github.com/user-attachments/assets/c75d16d2-8891-467a-aecb-0fc7a4d82224)
![Troll-detector-image](https://github.com/user-attachments/assets/6d105cd5-b2fb-4514-82a0-1641906d85e7)
![Troll-detector-App-summary](https://github.com/user-attachments/assets/1547b22e-0dbb-4af8-a327-77e4799fa5df)
![Troll-detector-App-05-22-2025_11_32_PM](https://github.com/user-attachments/assets/0fa0ad0b-5cb4-477d-91a4-4120be1db082)



