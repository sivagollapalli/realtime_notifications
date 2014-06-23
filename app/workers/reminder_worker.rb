class ReminderWorker
  include Sidekiq::Worker

  def perform(args)
    reminder = Reminder.find(args['id'])
    Pusher.trigger("reminder", "reminder_12345", {notification_text: "Reminder: #{reminder.text}"})
  end
end
