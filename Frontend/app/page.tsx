"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { InfoIcon, AlertTriangle, CheckCircle, Upload } from "lucide-react"
import Image from "next/image"
import { analyzeProfile } from "@/lib/api"
import AppInfoCard from "@/components/AppInfoCard"
import {GradientText} from "@/components/gradientText"

export default function Home() {
  const [profileName, setProfileName] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [comments, setComments] = useState("")
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()

  //   if (!profileName && !imageFile) {
  //     setError("Please provide at least a profile name and image")
  //     return
  //   }

  //   setLoading(true)
  //   setError(null)

  //   try {
  //     const formData = new FormData()
  //     if (imageFile) {
  //       formData.append("profile_image", imageFile)
  //     }
  //     formData.append("profile_name", profileName)
  //     formData.append("comments", comments)
  //     formData.append("country", "ge") // Set Georgia as the default country

  //     const data = await analyzeProfile(formData)
  //     setResults(data)
  //   } catch (err) {
  //     setError("Failed to analyze profile. Please try again.")
  //     console.error(err)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!profileName && !imageFile) {
    setError("Please provide at least a profile name and image");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const formData = new FormData();
    if (imageFile) {
      formData.append("profile_image", imageFile);
    }
    formData.append("profile_name", profileName);
    formData.append("comments", comments);
    formData.append("country", "ge"); // Default country

    // Send request to backend
    const response = await fetch("http://localhost:8000/v1/analyze", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.detail || "Request failed");
    }

    const data = await response.json();
    setResults(data);
  } catch (err: any) {
    setError("Failed to analyze profile. Please try again.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const renderThreatLevel = (score: number) => {
    if (score < 0.3) return { color: "bg-green-500", text: "Low", icon: <CheckCircle className="h-5 w-5" /> }
    if (score < 0.7) return { color: "bg-yellow-500", text: "Medium", icon: <AlertTriangle className="h-5 w-5" /> }
    return { color: "bg-red-500", text: "High", icon: <AlertTriangle className="h-5 w-5" /> }
  }

  return (
    <main className="container mx-auto py-10 px-4">
      {/* <h1 className="text-3xl font-bold mb-2 text-center">Troll Detector</h1> */}
      <GradientText text="Analyze Social media profiles to detect potential trolls"/>
     

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Profile Analysis</CardTitle>
            <CardDescription>Enter profile details to analyze for troll indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="profile-name" className="text-sm font-medium">
                  Profile Name
                </label>
                <Input
                  id="profile-name"
                  placeholder="John Doe"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Georgian names will be analyzed using Georgian naming patterns
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="profile-image" className="text-sm font-medium">
                  Profile Image
                </label>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("profile-image")?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>

                {imagePreview && (
                  <div className="mt-4 relative w-full h-48 border rounded-md overflow-hidden">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="comments" className="text-sm font-medium flex items-center">
                  <span>Recent Comments (optional)</span>
                  <span className="ml-2 text-xs text-muted-foreground">(Georgian comments will be translated)</span>
                </label>
                <Textarea
                  id="comments"
                  placeholder="Enter recent comments from this profile (one per line)..."
                  rows={5}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          {loading && (
            <Card className="mx-auto my-2">
              <CardHeader>
                <CardTitle>Analyzing Profile</CardTitle>
                <CardDescription>Please wait while we process your request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={45} className="w-full" />
                <p className="text-sm text-muted-foreground">
                  Running facial analysis, name verification, and comment analysis...
                </p>
              </CardContent>
            </Card>
          )}

          {error && (
            <Alert variant="destructive" className="mx-auto my-2">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!results ? (<AppInfoCard/>) : (
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>Troll probability: {Math.round(results.overall_score * 100)}%</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="image">Image</TabsTrigger>
                    <TabsTrigger value="text">Text</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Threat Level</span>
                        <div className="flex items-center gap-2">
                          {renderThreatLevel(results.overall_score).icon}
                          <span>{renderThreatLevel(results.overall_score).text}</span>
                        </div>
                      </div>
                      <Progress
                        value={results.overall_score * 100}
                        className={`w-full ${renderThreatLevel(results.overall_score).color}`}
                      />
                    </div>

                    <Alert>
                      <InfoIcon className="h-4 w-4" />
                      <AlertTitle>Analysis Summary</AlertTitle>
                      <AlertDescription>{results.summary}</AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="image" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Image Authenticity</span>
                        <div className="flex items-center gap-2">
                          {renderThreatLevel(results.image_analysis.fake_probability).icon}
                          <span>{renderThreatLevel(results.image_analysis.fake_probability).text}</span>
                        </div>
                      </div>
                      <Progress
                        value={results.image_analysis.fake_probability * 100}
                        className={`w-full ${renderThreatLevel(results.image_analysis.fake_probability).color}`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                      {results.image_analysis.attributes.map((attr: any, i: number) => (
                        <div key={i} className="flex justify-between">
                          <span className="text-sm">{attr.name}</span>
                          <span className="text-sm font-medium">{attr.value}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Name Authenticity</span>
                        <div className="flex items-center gap-2">
                          {renderThreatLevel(results.name_analysis.fake_probability).icon}
                          <span>{renderThreatLevel(results.name_analysis.fake_probability).text}</span>
                        </div>
                      </div>
                      <Progress
                        value={results.name_analysis.fake_probability * 100}
                        className={`w-full ${renderThreatLevel(results.name_analysis.fake_probability).color}`}
                      />
                    </div>

                    {results.name_analysis.country_specific && results.name_analysis.country_specific.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Georgian Name Analysis</h4>
                        <ul className="text-sm space-y-1">
                          {results.name_analysis.country_specific.map((pattern: string, i: number) => (
                            <li key={i}>{pattern}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {results.name_analysis.patterns && results.name_analysis.patterns.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-1">Suspicious Patterns</h4>
                        <ul className="text-sm space-y-1">
                          {results.name_analysis.patterns.map((pattern: string, i: number) => (
                            <li key={i}>{pattern}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {results.comment_analysis && (
                      <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Comment Analysis</h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Comment Toxicity</span>
                            <div className="flex items-center gap-2">
                              {renderThreatLevel(results.comment_analysis.toxicity_score).icon}
                              <span>{renderThreatLevel(results.comment_analysis.toxicity_score).text}</span>
                            </div>
                          </div>
                          <Progress
                            value={results.comment_analysis.toxicity_score * 100}
                            className={`w-full ${renderThreatLevel(results.comment_analysis.toxicity_score).color}`}
                          />
                        </div>

                        {results.comment_analysis.toxic_comments &&
                          results.comment_analysis.toxic_comments.length > 0 && (
                            <div className="space-y-2 mt-3">
                              <h4 className="text-sm font-medium">Flagged Comments</h4>
                              <div className="space-y-2">
                                {results.comment_analysis.toxic_comments.map((comment: any, i: number) => (
                                  <Alert key={i} variant="destructive" className="text-sm">
                                    {comment.text}
                                    <div className="mt-1 text-xs opacity-70">
                                      Toxicity: {Math.round(comment.score * 100)}%
                                    </div>
                                  </Alert>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
