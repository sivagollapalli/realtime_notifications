class Reminder
  include Mongoid::Document
  field :text, type: String
  field :notify_at, type: Time

  after_create :add_sidekiq_job
  before_destroy :remove_sidekiq_job

  def add_sidekiq_job
    id = ReminderWorker.perform_at(scheduled_at.second, {id: self.id.to_s})
    self.update_attributes(job_id: id)
  end

  def remove_sidekiq_job
    queue =  Sidekiq::ScheduledSet.new
    job = queue.find_job(self.job_id)
    job.delete if job
  end

  def scheduled_at
    posted_at.to_time.to_i - Time.now.to_i
  end
end
