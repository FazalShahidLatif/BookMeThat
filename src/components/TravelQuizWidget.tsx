import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, HelpCircle, ArrowRight, RefreshCw, CheckCircle2, AlertCircle, Copy, Trophy, Target, Award, PlayCircle
} from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: { key: string; text: string; description: string }[];
  correctAnswer: string;
}

export default function TravelQuizWidget() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'calculating' | 'results'>('intro');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [calculatedScore, setCalculatedScore] = useState(0);
  const [unlockedCoupon, setUnlockedCoupon] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      category: "eSIM Hotspots",
      question: "Can you share personal data hotspots/tethering with travel eSIMs (like Saily or Airalo) abroad?",
      options: [
        { key: "A", text: "Yes, Saily and Airalo fully support hotspot sharing without middleman fees.", description: "Correct! Saily eSIM acts as a native carrier connection profile allowing standard mobile personal hotspot sharing across all compatible smartphones." },
        { key: "B", text: "No, hotspot sharing is strictly blocked on travel discount networks.", description: "Incorrect. Saily and Airalo do not restrict personal hotpot sharing or connectivity options." },
        { key: "C", text: "Only on premium business packages starting at $50/month.", description: "Incorrect. Standard global eSIM profiles allow tethering automatically." }
      ],
      correctAnswer: "A"
    },
    {
      id: 2,
      category: "Nomad Security OTP",
      question: "How do you securely receive critical bank OTP codes on your native number while surfing abroad on cheap eSIM data?",
      options: [
        { key: "A", text: "Turn off your personal home phone SIM completely to avoid cross-network lines.", description: "Incorrect. If your home SIM is disabled, bank OTP text messages cannot reach your phone." },
        { key: "B", text: "Set your home SIM to voice/SMS only (roaming ON), and travel eSIM as the primary cellular data connection.", description: "Correct! A Dual-SIM layout receives important text verification messages globally and routes cellular web data to your cheap eSIM plan." },
        { key: "C", text: "Rely solely on local public airport Wi-Fi without encryption shields.", description: "Incorrect. Public unencrypted Wi-Fi represents a severe security vector for account hacking." }
      ],
      correctAnswer: "B"
    },
    {
      id: 3,
      category: "Local Road Logistics",
      question: "Does rental collision damage insurance protect you if you drive without an International Driving Permit (IDP) in Italy or Greece?",
      options: [
        { key: "A", text: "Yes, car rental agreements always override regional driving license requirements.", description: "Incorrect. Counters lack authority to override regional vehicle legislation constraints." },
        { key: "B", text: "No, driving without an IDP is legally invalid and voids standard collision damage protections.", description: "Correct! Most insurances state the driver must possess legally required driving permits. Driving without one voids liability protection." },
        { key: "C", text: "Only if you purchase direct roadside assistance options with local cash.", description: "Incorrect. Cash payments do not restore valid regulatory permit statuses." }
      ],
      correctAnswer: "B"
    },
    {
      id: 4,
      category: "Flight Passages Rights",
      question: "If an airline claims 'adverse weather' caused a 4-hour delay, but adjacent gates departed successfully, can you claim cash compensation?",
      options: [
        { key: "A", text: "Yes, weather must truly halt airport movements to justify an exemption under EU261 rules.", description: "Correct! Airlines routinely claim general weather anomalies to avoid payouts, but aviation radar records override false claims." },
        { key: "B", text: "No, because the airline is the sole legal arbitrator of weather reports.", description: "Incorrect. EU regulations require external court verification of flight radar circumstances." },
        { key: "C", text: "Only if your flight baggage gets lost during transit operations.", description: "Incorrect. Flight delay compensation (EU261) operates independently from physical baggage recovery claims." }
      ],
      correctAnswer: "A"
    },
    {
      id: 5,
      category: "AdSense link ethics",
      question: "What rel attribute must outbound affiliate referral links contain to satisfy strict search search engines guides?",
      options: [
        { key: "A", text: "rel='stylesheet stylesheet-manifest'", description: "Incorrect. The stylesheet rel identifies style resources, not web anchor references." },
        { key: "B", text: "rel='noopener noreferrer nofollow sponsored'", description: "Correct! This configuration complies with Google AdSense rules and informs crawlers that it is a safe commercial link structure." },
        { key: "C", text: "rel='author-credentials-live'", description: "Incorrect. Author tags identify content creator profiles, not sponsored outbound channels." }
      ],
      correctAnswer: "B"
    }
  ];

  // Game timer to show time spent on game
  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Loading animation simulation for score evaluation
  useEffect(() => {
    let interval: any;
    if (gameState === 'calculating') {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // transition to results
            setGameState('results');
            calculateFinalScore();
            return 100;
          }
          return prev + 4;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setTimer(0);
    setIsTimerRunning(true);
    setLoadingProgress(0);
  };

  const handleSelectAnswer = (optionKey: string) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: optionKey }));
    
    // Auto advance after 250ms for fluent interactive feel
    setTimeout(() => {
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(prev => prev + 1);
      } else {
        setIsTimerRunning(false);
        setGameState('calculating');
      }
    }, 450);
  };

  const calculateFinalScore = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    setCalculatedScore(Math.round((correctCount / questions.length) * 100));
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText('NOMADIQ-FREE-2026');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="border-2 border-brand-orange bg-white p-6 sm:p-8 space-y-6 max-w-3xl mx-auto w-full shadow-[5px_5px_0px_#E55B13]" id="nomad-iq-challenge">
      
      {/* Intro state */}
      {gameState === 'intro' && (
        <div className="space-y-6 text-center py-6">
          <div className="inline-flex items-center gap-1.5 text-[9px] text-brand-orange font-mono font-bold bg-brand-orange/5 px-3 py-1 border border-brand-orange/30 uppercase tracking-widest mx-auto">
            <Trophy className="w-3.5 h-3.5 text-brand-orange animate-bounce" /> Gamified Performance Quiz
          </div>
          
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-2xl text-gray-900 italic md:text-3xl leading-tight">
              Take the 60-Second Smart Nomad IQ Challenge!
            </h3>
            <p className="text-xs text-gray-550 leading-relaxed font-sans max-w-xl mx-auto">
              Test your knowledge on hidden cellular charges, global car rental deposits, EU delay compensation flight regulations, and safe outbound search guidelines. Secure your travel smart badge and unlock **special direct-checkout referral promo rates**!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2 font-mono">
            <div className="p-3 bg-[#FAF9F6] border border-[#E5E5E1] space-y-1">
              <span className="text-[9px] text-[#E55B13] font-bold block uppercase tracking-wider">5 Hot-seat questions:</span>
              <span className="text-[10px] text-gray-650 block">Targeting real-world traveler scenarios.</span>
            </div>
            <div className="p-3 bg-[#FAF9F6] border border-[#E5E5E1] space-y-1">
              <span className="text-[9px] text-[#E55B13] font-bold block uppercase tracking-wider">Estimated Time:</span>
              <span className="text-[10px] text-gray-650 block">Requires 60 seconds of logical choices.</span>
            </div>
            <div className="p-3 bg-[#FAF9F6] border border-[#E5E5E1] space-y-1">
              <span className="text-[9px] text-[#E55B13] font-bold block uppercase tracking-wider">Secret Referral:</span>
              <span className="text-[10px] text-gray-650 block">Score &gt;80% to claim hidden promo vaults.</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              onClick={startQuiz}
              className="bg-brand-orange hover:bg-neutral-900 text-white font-mono font-bold uppercase py-3.5 px-8 text-xs tracking-widest cursor-pointer select-none transition flex items-center gap-2 group transform active:scale-95"
            >
              Start 60S Challenge
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      )}

      {/* Playing state */}
      {gameState === 'playing' && (
        <div className="space-y-6">
          {/* Header Progress and stats */}
          <div className="flex justify-between items-center border-b border-[#E5E5E1] pb-3 text-xs font-mono select-none">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold uppercase tracking-wider block">Question:</span>
              <span className="text-brand-orange font-bold text-sm block">
                {currentQuestionIdx + 1} of {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 font-bold uppercase tracking-wider">Smart Score timer:</span>
              <span className="bg-neutral-900 text-neutral-100 font-mono px-2 py-0.5 text-xs text-center border border-zinc-700">
                {formatTime(timer)}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-[#E5E5E1] rounded-none overflow-hidden">
            <div 
              className="h-full bg-brand-orange transition-all duration-300"
              style={{ width: `${((currentQuestionIdx) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question display */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono font-bold px-2 py-0.5 bg-brand-orange/10 text-brand-orange uppercase border border-brand-orange/20">
                {questions[currentQuestionIdx].category}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base sm:text-lg text-gray-950 leading-snug italic">
              {questions[currentQuestionIdx].question}
            </h4>
          </div>

          {/* Options list */}
          <div className="space-y-3">
            {questions[currentQuestionIdx].options.map(opt => {
              const isSelected = selectedAnswers[currentQuestionIdx] === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelectAnswer(opt.key)}
                  className={`w-full text-left p-4 border transition flex gap-3 cursor-pointer items-start ${
                    isSelected 
                      ? 'border-brand-orange bg-brand-orange/5 text-[#E55B13]' 
                      : 'border-[#E5E5E1] bg-[#FAF9F6] text-gray-700 hover:bg-white hover:border-brand-orange'
                  }`}
                >
                  <span className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center font-mono text-[10px] font-bold ${
                    isSelected ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white text-gray-500 border-gray-300'
                  }`}>
                    {opt.key}
                  </span>
                  <div className="space-y-1">
                    <span className="text-xs font-sans md:text-sm block font-medium leading-normal ">{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
            <span>Tip: Read all options fully to gauge optimal responses.</span>
            <span>Estimated time remaining: ~35 seconds</span>
          </div>
        </div>
      )}

      {/* Calculating scores with pulsing delay to maximize time on page */}
      {gameState === 'calculating' && (
        <div className="py-12 space-y-6 text-center">
          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
            <RefreshCw className="w-10 h-10 text-brand-orange animate-spin duration-1000" />
            <span className="text-[10px] font-mono font-bold absolute text-gray-900">{loadingProgress}%</span>
          </div>
          
          <div className="max-w-xs mx-auto space-y-1 animate-pulse">
            <h4 className="font-serif font-bold text-sm italic text-gray-900">Evaluating Smart Nomad telemetry...</h4>
            <p className="text-[10px] font-sans text-gray-500 leading-normal">
              Analyzing answers against direct eSIM specifications, airport legal precedents, and FTC compliance mandates.
            </p>
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            {loadingProgress > 20 && (
              <div className="text-[9px] font-mono text-green-700 flex justify-center items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3 shrink-0" /> Verified 100% link security compliance.
              </div>
            )}
            {loadingProgress > 50 && (
              <div className="text-[9px] font-mono text-green-700 flex justify-center items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3 shrink-0" /> Audited Dual-SIM network cellular models.
              </div>
            )}
            {loadingProgress > 80 && (
              <div className="text-[9px] font-mono text-green-700 flex justify-center items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3 shrink-0" /> Decoded EU261 flight delays telemetry.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results panel with extensive readings */}
      {gameState === 'results' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Header with final rating */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 bg-[#FAF9F6] border border-[#E5E5E1] p-5">
            <div className="flex items-center gap-4 text-left">
              <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 text-[#E55B13]">
                {calculatedScore >= 80 ? <Award className="w-10 h-10 shrink-0" /> : <Target className="w-10 h-10 shrink-0" />}
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold block text-gray-400 uppercase tracking-widest">PERSONAL TELEMETRY RATING:</span>
                <h4 className="font-serif font-bold text-base text-gray-900 italic leading-none">
                  {calculatedScore === 100 ? 'Pro Global Master Nomad' : 
                   calculatedScore >= 80 ? 'Certified Smart Explorer' : 
                   calculatedScore >= 50 ? 'Regional Backpacker Associate' : 'Beginner Vacation Tourist'}
                </h4>
              </div>
            </div>

            <div className="bg-neutral-900 text-white px-5 py-3 border border-zinc-700 text-center shrink-0 w-full sm:w-auto">
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block font-bold">SMART NOMAD SCORE:</span>
              <strong className="text-3xl font-serif font-bold italic tracking-tight text-white block">
                {calculatedScore}%
              </strong>
            </div>
          </div>

          {/* Interactive corrections listing (Requires users to read results, spending extra 30-40 seconds on page!) */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider block">Question Corrections & Logic Breakdown:</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions.map((q, idx) => {
                const answerIsCorrect = selectedAnswers[idx] === q.correctAnswer;
                const chosenOption = q.options.find(o => o.key === selectedAnswers[idx]);
                const correctOption = q.options.find(o => o.key === q.correctAnswer);

                return (
                  <div key={q.id} className={`p-4 border text-[11px] leading-relaxed space-y-2 ${
                    answerIsCorrect ? 'bg-green-50/20 border-green-200' : 'bg-red-50/10 border-red-200'
                  }`}>
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-serif font-bold text-gray-900">Q{q.id}: {q.category}</span>
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 ${
                        answerIsCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {answerIsCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-1 font-sans text-gray-650">
                      <p className="text-xs text-gray-900 font-semibold italic">"{q.question}"</p>
                      <p>
                        Your choice: <strong className="font-mono text-[10px] text-gray-900">({selectedAnswers[idx] || 'No Selection'})</strong> - {chosenOption?.text || 'None'}
                      </p>
                      {!answerIsCorrect && (
                        <p className="text-brand-orange font-medium">
                          Correct Choice: <strong className="font-mono text-[10px]">({q.correctAnswer})</strong> - {correctOption?.text}
                        </p>
                      )}
                      
                      <div className="bg-[#FAF9F6] p-2 border border-[#E5E5E1] text-[10px] text-gray-500 font-mono mt-2">
                        {correctOption?.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reward voucher code card */}
          {calculatedScore >= 80 ? (
            <div className="border border-[#E55B13] bg-brand-orange/5 p-6 text-center space-y-4">
              <div className="space-y-1 text-center">
                <span className="text-[9px] font-mono font-bold text-brand-orange uppercase tracking-widest block">🎉 DIRECT VOUCHER REWARD LOCKED 🎉</span>
                <h4 className="font-serif font-bold text-xl text-gray-900 italic leading-snug">
                  You Unlocked the Exclusive Nomad Direct-Bypass Code!
                </h4>
                <p className="text-xs text-gray-650 max-w-md mx-auto leading-normal">
                  Copy your special code below and use it on the main platforms to claim direct discounts of up to 40% with zero broker markups.
                </p>
              </div>

              <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto w-full pt-1">
                <div className="bg-white border border-[#E5E5E1] p-3 text-sm font-mono text-[#E55B13] font-bold text-center tracking-widest uppercase w-full">
                  NOMADIQ-FREE-2026
                </div>
                <button
                  onClick={copyCouponCode}
                  className="bg-brand-orange hover:bg-neutral-900 text-white text-[9px] font-mono font-bold uppercase tracking-widest py-3 px-5 whitespace-nowrap cursor-pointer select-none transition shrink-0 transform active:scale-95"
                >
                  {copiedCoupon ? 'Copied ✅' : 'Copy Code'}
                </button>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-[#E5E5E1] p-6 text-center bg-[#FAF9F6] space-y-3">
              <span className="text-gray-400 text-xl font-light">😕</span>
              <div className="space-y-1">
                <h5 className="font-serif font-bold text-sm text-gray-900">Score of 80% is required to secure the dynamic discount ledger</h5>
                <p className="text-[10px] text-gray-500 max-w-sm mx-auto leading-normal">
                  Read our curated topical guides below or scroll to individual Silos to investigate precise eSIM configurations and car rental policies, then try again.
                </p>
              </div>
              <button
                onClick={startQuiz}
                className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#E55B13] hover:underline"
              >
                Re-Try Smart Challenge ↻
              </button>
            </div>
          )}

          {/* Reset buttons */}
          <div className="flex justify-center gap-4 text-xs font-mono">
            <button
              onClick={startQuiz}
              className="text-[#E55B13] hover:underline font-bold"
            >
              Play Challenge Again ↻
            </button>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400">Total session time spent: {formatTime(timer)} index</span>
          </div>

        </div>
      )}

    </div>
  );
}
