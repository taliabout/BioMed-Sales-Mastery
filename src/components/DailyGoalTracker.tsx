import React, { useState, useEffect } from 'react';
import { HealthcareTrack } from '../types';
import { CheckCircle2, Flame, Award, ArrowRight, RotateCcw, Target, Sparkles, Trophy } from 'lucide-react';

interface DailyGoalTrackerProps {
  currentTrack: HealthcareTrack;
  onNavigateToView?: (view: any) => void;
}

interface DailyTask {
  id: string;
  title: string;
  category: string;
  timeEst: string;
  points: number;
  completed: boolean;
  actionView: string;
}

export const DailyGoalTracker: React.FC<DailyGoalTrackerProps> = ({ currentTrack, onNavigateToView }) => {
  const storageKey = `biomed_daily_goals_${new Date().toISOString().slice(0, 10)}`;

  const getInitialTasks = (): DailyTask[] => {
    return [
      {
        id: 'task-1',
        title: 'Complete 60-Second Scrub-Sink Pitch (Microphone Practice)',
        category: 'Verbal Detailing Drill',
        timeEst: '2 min',
        points: 25,
        completed: false,
        actionView: 'pitch_lab',
      },
      {
        id: 'task-2',
        title: 'Dismantle One High-Stakes Hospital Objection ("Loyal to Stryker/Medtronic")',
        category: 'Battlecard Mastery',
        timeEst: '3 min',
        points: 25,
        completed: false,
        actionView: 'battlecards',
      },
      {
        id: 'task-3',
        title: 'Listen to Master Voice Detailing Audio Mockup (Down-Tone Pacing Drill)',
        category: 'Vocal Inflection',
        timeEst: '2 min',
        points: 25,
        completed: false,
        actionView: 'voice_mockups',
      },
      {
        id: 'task-4',
        title: 'Execute Shelby Haas 5-Step Reframe on a 10-Year Competitor Objection',
        category: 'Titan Sales Lab',
        timeEst: '3 min',
        points: 25,
        completed: false,
        actionView: 'titan_lab',
      },
      {
        id: 'task-5',
        title: 'Send 1 High-Converting LinkedIn InMail via Networking Org Map',
        category: 'Career Pipeline',
        timeEst: '3 min',
        points: 25,
        completed: false,
        actionView: 'networking_map',
      },
    ];
  };

  const [tasks, setTasks] = useState<DailyTask[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : getInitialTasks();
    } catch {
      return getInitialTasks();
    }
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('biomed_streak_count');
      return saved ? parseInt(saved, 10) : 4;
    } catch {
      return 4;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks, storageKey]);

  const toggleTask = (taskId: string) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t));
      const allDone = next.every((t) => t.completed);
      if (allDone && !prev.every((t) => t.completed)) {
        const nextStreak = streakDays + 1;
        setStreakDays(nextStreak);
        localStorage.setItem('biomed_streak_count', nextStreak.toString());
      }
      return next;
    });
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPct = Math.round((completedCount / tasks.length) * 100);
  const totalEarnedPoints = tasks.reduce((sum, t) => sum + (t.completed ? t.points : 0), 0);

  const resetToday = () => {
    setTasks(getInitialTasks());
  };

  return (
    <div className="rounded-xl border border-blue-100 bg-white p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Target className="h-4 w-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              President's Club Daily Performance Drills
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Daily micro-disciplines that separate average healthcare reps from top 1% quota achievers
          </p>
        </div>

        {/* Streak & Score Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{streakDays}-Day Field Streak</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700 font-mono">
            <Trophy className="h-3.5 w-3.5 text-blue-600" />
            <span>{totalEarnedPoints} / 100 Pts</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">Daily Execution Progress</span>
          <span className="font-mono font-bold text-blue-600">
            {completedCount} of {tasks.length} Completed ({progressPct}%)
          </span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`group flex cursor-pointer items-start justify-between rounded-lg border p-3.5 transition ${
              task.completed
                ? 'border-emerald-200 bg-emerald-50/60'
                : 'border-slate-200 bg-slate-50/70 hover:border-blue-300 hover:bg-blue-50/30'
            }`}
          >
            <div className="flex items-start gap-3 pr-2">
              <div className="pt-0.5 shrink-0">
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500 transition-colors" />
                )}
              </div>
              <div className="space-y-1">
                <span
                  className={`text-xs font-medium block leading-snug ${
                    task.completed ? 'text-slate-500 line-through' : 'text-slate-900 font-semibold'
                  }`}
                >
                  {task.title}
                </span>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="text-blue-600 font-medium">{task.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{task.timeEst}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-bold text-slate-600">+{task.points} pts</span>
                </div>
              </div>
            </div>

            {onNavigateToView && !task.completed && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToView(task.actionView);
                }}
                className="shrink-0 rounded p-1 text-slate-400 hover:text-blue-600 hover:bg-white"
                title="Go to practice module"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Completion Celebration or Advice Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        {progressPct === 100 ? (
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span>All Daily Drills Completed! Your territory preparation is at President's Club caliber today.</span>
          </div>
        ) : (
          <span className="text-slate-500 italic">
            "Top reps don't rely on talent; they rely on daily micro-reps before walking into the hospital."
          </span>
        )}

        <button
          onClick={resetToday}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700"
          title="Reset today's checklist"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Day</span>
        </button>
      </div>
    </div>
  );
};
