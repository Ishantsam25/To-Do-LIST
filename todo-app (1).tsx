import React, { useState, useEffect } from 'react';
import { Clock, Star, Play, Pause, Square, TrendingUp } from 'lucide-react';

const
      if (newDate !== currentDate) {
        setCurrentDate(newDate);
      }
    }, 60000);

    return () => clearInterval(checkMidnight);
  }, [currentDate]);

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasksByDate');
    if (savedTasks) {
      const parsed = JSON.parse(savedTasks);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const cutoffDate = sevenDaysAgo.toISOString().split('T')[0];
      
      const filtered = {};
      Object.keys(parsed).forEach(date => {
        if (date >= cutoffDate) {
          filtered[date] = parsed[date];
        }
      });
      setTasksByDate(filtered);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    if (Object.keys(tasksByDate).length > 0) {
      l
  const handleAddTask = () => {
   


    const today = new Date(currentDate + 'T00:00:00');
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if 

              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="w-full p-2 border border-gray-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            
            <div 
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <Star className={isImportant ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} size={18} />
                <span className="text-sm font-medium">Important</span>
              </label>
            </div>
            
            <button
              onClick={handleAddTask}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors duration-300 font-medium"
            >
              Add Task
            </button>
          </div>
          
          {sortedDates.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No tasks yet. Add some!</p>
          ) : (
            sortedDates.map(date => (
              <div key={date} className="mb-6">
                <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-purple-300">
                  <h2 className="text-lg font-bold text-purple-700">
                    {formatDateHeader(date)}
                  </h2>
                  
                  <div className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-lg shadow-md">
                    <TrendingUp size={20} className="animate-pulse" />
                    <div className="text-right">
                      <div className="text-xs font-medium opacity-90">Total Study Time</div>
                      <div className="text-lg font-bold">{formatTotalTime(getTotalTimeForDate(date))}</div>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {tasksByDate[date].map(task => {
                    const time = formatElapsedTime(timers[task.id]?.elapsed || 0);
                    const isRunning = timers[task.id]?.running;
                    
                    return (
                      <li 
                        key={task.id} 
                        className={`flex items-start bg-purple-50 p-3 rounded border-l-4 ${task.important ? 'border-yellow-400 bg-yellow-50' : 'border-purple-300'} hover:bg-purple-100 transition-colors duration-200`}
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTaskCompletion(date, task.id)}
                          className="h-5 w-5 text-green-500 rounded focus:ring-purple-500 mr-3 mt-1 flex-shrink-0"
                        />
                        <div className="flex-grow">
                          <div className="flex items-start gap-2 mb-2">
                            {task.important && (
                              <Star className="text-yellow-500 fill-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                            )}
                            {editingId === task.id ? (
                              <input
                                type="text"
                                value={editingText}
                                onChange={(e) => setEditingText(e.target.value)}
                                onKeyDown={(e) => handleEditKeyPress(e, date, task.id)}
                                onBlur={() => saveEdit(date, task.id)}
                                autoFocus
                                className="flex-grow p-1 border border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            ) : (
                              <span 
                                onClick={() => !task.completed && startEditing(task)}
                                className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : 'text-gray-800 hover:text-purple-600'}`}
                              >
                                {task.text}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2">
                            {task.time && (
                              <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border bg-blue-100 border-blue-400 text-blue-700">
                                <Clock size={12} />
                                {formatTime(task.time)} IST
                              </span>
                            )}
                            
                            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 shadow-sm border-2 transition-all ${isRunning ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-green-200' : 'bg-gray-50 border-gray-300'}`}>
                              <div className="flex items-center gap-1">
                                <div className="flex flex-col items-center">
                                  <span className={`text-xl font-bold font-mono ${isRunning ? 'text-green-700' : 'text-gray-700'}`}>
                                    {time.hours}
                                  </span>
                                  <span className="text-[8px] text-gray-500 uppercase">hrs</span>
                                </div>
                                <span className={`text-xl font-bold ${isRunning ? 'text-green-600' : 'text-gray-600'}`}>:</span>
                                <div className="flex flex-col items-center">
                                  <span className={`text-xl font-bold font-mono ${isRunning ? 'text-green-700' : 'text-gray-700'}`}>
                                    {time.minutes}
                                  </span>
                                  <span className="text-[8px] text-gray-500 uppercase">min</span>
                                </div>
                                <span className={`text-xl font-bold ${isRunning ? 'text-green-600' : 'text-gray-600'}`}>:</span>
                                <div className="flex flex-col items-center">
                                  <span className={`text-xl font-bold font-mono ${isRunning ? 'text-green-700' : 'text-gray-700'}`}>
                                    {time.seconds}
                                  </span>
                                  <span className="text-[8px] text-gray-500 uppercase">sec</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-1 ml-1 pl-2 border-l border-gray-300">
                                {!isRunning ? (
                                  <button
                                    onClick={() => startTimer(task.id)}
                                    className="p-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-110"
                                    title="Start timer"
                                  >
                                    <Play size={14} fill="white" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => pauseTimer(task.id)}
                                    className="p-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-all hover:scale-110"
                                    title="Pause timer"
                                  >
                                    <Pause size={14} fill="white" />
                                  </button>
                                )}
                                {timers[task.id] && (
                                  <button
                                    onClick={() => stopTimer(task.id)}
                                    className="p-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all hover:scale-110"
                                    title="Stop & reset timer"
                                  >
                                    <Square size={14} fill="white" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(date, task.id)}
                          className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
