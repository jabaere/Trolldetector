import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function AppInfoCard() {
  return (
    <Card className="max-w-xl mx-auto">
  
      <CardContent className="space-y-4 text-sm text-gray-700 pt-6"> {/*pb-12*/} 
              {/* <CardHeader className="space-y-0 p-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                      <AlertTriangle className="text-yellow-500" />
                      AI-Powered Troll Detector
                  </CardTitle>
              </CardHeader> */}
              <div>
                  <h3>This app uses AI-powered image, comment, and name analysis to estimate profile authenticity.</h3>
                  <p>
                      It analyzes profile pictures, names, and comments using custom rules to detect possible troll profiles.
                  </p>
              </div>
        
              <div>
                  

                  <p>
                      <strong>Face Analysis:</strong> Uses DeepFace and Torch to detect emotions, age, and facial traits.
                  </p>
                 <p>
                      <strong>Comment Analysis:</strong> Utilizes Google's Perspective API to assess toxicity, sentiment, and language impact..
                  </p>
              </div>

        <div>
          <h3 className="font-semibold">Georgian Name Analysis</h3>
          <ul className="list-disc list-inside pl-2 mt-1 space-y-1">
            <li><strong>Surname Pattern Recognition:</strong> Detects common Georgian endings like <em>-shvili</em>, <em>-dze</em>, <em>-ia</em>, <em>-ani</em>, <em>-uri</em>. Works with Georgian script and Latin versions.</li>
            <li><strong>First Name Analysis:</strong> Identifies typical Georgian first name patterns and adjusts troll score accordingly.</li>
            <li><strong>Script Detection:</strong> Automatically detects if the name uses Georgian or Latin script to apply the right rules.</li>
          </ul>
        </div>
              <div className="text-yellow-600 text-sm font-medium">
                  ⚠️ Georgian comments are translated using Google Translate API. Accuracy may vary — for better results, please translate to English manually before input using Google Translate or another reliable service.
              </div>

              <div className="text-yellow-600 font-medium">
                  ⚠️ This system is not 100% accurate. A high troll score does not guarantee the profile is fake — false positives are possible.
              </div>
        
      </CardContent>
    </Card>
  );
}
