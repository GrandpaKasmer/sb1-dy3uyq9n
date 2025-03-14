import { Observable, Frame } from '@nativescript/core';
import { supabase } from './supabase';
import { translations } from './i18n/translations';

export class TaskHistoryViewModel extends Observable {
    private _tasks: Array<any> = [];
    private _language: string = 'en';

    constructor() {
        super();
        this.set('tasks', []);
        this.loadUserLanguage();
        this.loadTasks();
    }

    private async loadUserLanguage() {
        try {
            const user = (await supabase.auth.getUser()).data.user;
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('preferred_language')
                .eq('id', user?.id || '')
                .single();

            if (profile) {
                this._language = profile.preferred_language;
            }
        } catch (error) {
            console.error('Error loading user language:', error);
        }
    }

    async loadTasks() {
        try {
            const user = (await supabase.auth.getUser()).data.user;
            
            // Get user tasks
            const { data: tasks, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user?.id || '')
                .order('created_at', { ascending: false });

            if (error) throw error;

            // Format tasks for display
            const formattedTasks = (tasks || []).map(task => {
                const startTime = new Date(task.start_time);
                const endTime = task.end_time ? new Date(task.end_time) : null;
                
                // Calculate duration in minutes
                const durationMinutes = endTime 
                    ? Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60)) 
                    : 0;
                
                // Format duration as hours and minutes
                const hours = Math.floor(durationMinutes / 60);
                const minutes = durationMinutes % 60;
                const formattedDuration = `${hours}h ${minutes}m`;
                
                // Format date
                const formattedDate = startTime.toLocaleDateString();
                
                // Get task name in current language
                const taskName = translations[this._language].tasks[task.task_type] || 'Unknown Task';
                
                return {
                    ...task,
                    formattedDate,
                    formattedDuration,
                    taskName
                };
            });

            this.set('tasks', formattedTasks);
            this._tasks = formattedTasks;
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    onTaskTap(args: any) {
        const task = this._tasks[args.index];
        Frame.topmost().navigate({
            moduleName: 'app/task-details-page',
            context: {
                task
            }
        });
    }
}