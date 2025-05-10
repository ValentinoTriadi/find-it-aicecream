import { WorkCard, WorkCardProps } from "@/components/landing/work-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth.context";
import {
  ArrowRight,
  BookOpen,
  Check,
  Globe,
  Swords,
  Trophy,
} from "lucide-react";
import { a } from "node_modules/framer-motion/dist/types.d-B50aGbjN";
import { Link } from "react-router-dom";

export const workCardData: WorkCardProps[] = [
  {
    step: 1,
    title: "Create an Account",
    description:
      "Sign up and create your profile to start your language learning journey.",
    features: [
      "Master vocabulary and phrases for real-world situations",
      "Master vocabulary and phrases for real-world situations",
    ],
  },
  {
    step: 2,
    title: "Learn Basics",
    description:
      "Complete introductory lessons to build your foundation in English.",
    features: [
      "Topic-based vocabulary and phrases",
      "Interactive learning materials",
    ],
  },
  {
    step: 3,
    title: "Start Battling",
    description:
      "Challenge other learners to battles and improve your skills through practice.",
    features: [
      "Real-time conversation practice",
      "Instant feedback on your performance",
    ],
  },
];

export default function LandingPage() {
  const auth = useAuth();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-dark-blue text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <img
            src="/images/battletalk-logo.png"
            height={53}
            className="h-12 py-2"
          />

          {auth.user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <Button className="bg-stronger-blue hover:bg-more-stronger-blue text-white">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-stronger-blue hover:bg-more-stronger-blue text-white">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-12">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold text-dark-blue mb-4">
                  Master English by{" "}
                  <span className="text-stronger-blue">Battling</span> with
                  Others
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                  Improve your English skills through fun, interactive battles
                  with other learners.
                </p>
                <Link to={auth.user ? "/profile" : "/register"}>
                  <Button
                    size="lg"
                    className="bg-stronger-blue hover:bg-more-stronger-blue text-white"
                  >
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="md:w-1/2">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-stronger-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-dark-blue">
                          Learn English Naturally
                        </h3>
                        <p className="text-sm text-gray-600">
                          Through conversation-based battles
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Swords className="w-5 h-5 text-stronger-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-dark-blue">
                          Battle with Others
                        </h3>
                        <p className="text-sm text-gray-600">
                          Practice real conversations in a fun, competitive
                          environment
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-stronger-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-dark-blue">
                          Topic-Based Learning
                        </h3>
                        <p className="text-sm text-gray-600">
                          Master vocabulary and phrases for real-world
                          situations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-5 h-5 text-stronger-blue" />
                      </div>
                      <div>
                        <h3 className="font-medium text-dark-blue">
                          Track Your Progress
                        </h3>
                        <p className="text-sm text-gray-600">
                          Earn achievements and see your improvement over time
                        </p>
                      </div>
                    </div>

                    {!auth.user && (
                      <Link to="/register">
                        <Button className="w-full bg-stronger-blue hover:bg-more-stronger-blue text-white">
                          Create New Account
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-dark-blue mb-2">
                How BattleTalk Works
              </h2>
              <p className="text-gray-600">
                Our simple approach makes learning English fun and effective
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {workCardData.map((card, index) => (
                <WorkCard
                  step={card.step}
                  title={card.title}
                  description={card.description}
                  features={card.features}
                  key={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-dark-blue to-stronger-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">
              Ready to Start Your English Journey?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are improving their English skills
              through BattleTalk's interactive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={auth.user ? "/profile" : "/register"}>
                <Button
                  size="lg"
                  className="bg-white text-dark-blue hover:bg-gray-100"
                >
                  Get Started Now
                </Button>
              </Link>
              {!auth.user && (
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10 hover:text-white"
                  >
                    I Already Have an Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark-blue text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8">
                <img
                  src="/images/battletalk-logo.png"
                  alt="BattleTalk Logo"
                  className="h-full"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <Link
                to="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms Of Service
              </Link>
              <Link
                to="#"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
