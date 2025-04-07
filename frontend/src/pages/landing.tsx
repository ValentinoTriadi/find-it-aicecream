import { ArrowRight, Check, Globe, MessageSquare, FileText, Trophy } from "lucide-react"
import { Button } from "../components/button"
import { Link } from "react-router-dom" // Pastikan ini tersedia

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="bg-[#0a3b56] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#0a3b56] rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold">BattleTalk</span>
          </div>
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline" className="text-white border-white hover:bg-[#0a4b6e]">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-[#5bb4e5] hover:bg-[#4aa3d4] text-white">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-16 px-4">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0a3b56]">
                Master English by <span className="text-[#5bb4e5]">Battling</span> with{" "}
                <span className="text-[#0a3b56]">Others</span>
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Improve your English skills through fun, interactive battles with other learners.
              </p>
              <Link to="/register">
                <Button className="mt-8 bg-[#5bb4e5] hover:bg-[#4aa3d4] text-white px-8 py-6 text-lg rounded-md flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="space-y-6">
                {/* Feature Boxes */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e8f4f9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-[#5bb4e5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0a3b56]">Learn English Naturally</h3>
                    <p className="text-gray-600">Through conversation-based battles</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e8f4f9] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-[#5bb4e5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0a3b56]">Battle with Others</h3>
                    <p className="text-gray-600">Practice real conversations in a fun, competitive environment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e8f4f9] rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[#5bb4e5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0a3b56]">Topic-Based Learning</h3>
                    <p className="text-gray-600">Master vocabulary and phrases for real-world situations</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#e8f4f9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-[#5bb4e5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0a3b56]">Track Your Progress</h3>
                    <p className="text-gray-600">Earn achievements and see your improvement over time</p>
                  </div>
                </div>
                <Link to="/register">
                  <Button className="w-full bg-[#5bb4e5] hover:bg-[#4aa3d4] text-white py-3">Create New Account</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How BattleTalk Works */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0a3b56] mb-2">How BattleTalk Works</h2>
            <p className="text-gray-600 mb-12">Follow these steps to improve your English with fun, engaging battles!</p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#e8f4f9] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5bb4e5] font-semibold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0a3b56] mb-4">Create an Account</h3>
                <p className="text-gray-600 mb-4">
                  Sign up and personalize your profile to get started.
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Set your English level & interests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Join a global learning community</span>
                  </li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#e8f4f9] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5bb4e5] font-semibold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0a3b56] mb-4">Start a Battle</h3>
                <p className="text-gray-600 mb-4">
                  Get matched with another learner and engage in a real-time English conversation.
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Speak based on daily or random topics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Practice speaking & listening live</span>
                  </li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#e8f4f9] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#5bb4e5] font-semibold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-[#0a3b56] mb-4">Get Feedback</h3>
                <p className="text-gray-600 mb-4">
                  Receive automated feedback to help you improve your grammar, vocabulary, and fluency.
                </p>
                <ul className="text-left space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">AI-based scoring & suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-gray-600">Track your progress and see growth</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-[#0a3b56] text-white text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your English Journey?</h2>
            <p className="mb-8">
              Join thousands of learners who are improving their English skills through BattleTalk's interactive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-white text-[#0a3b56] hover:bg-gray-100">Get Started Now</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-white border-white hover:bg-[#0a4b6e]">
                  I Already Have an Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a3b56] text-white p-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-[#0a3b56] rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="text-lg font-bold">BattleTalk</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms Of Service</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
