# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)

TestAngular::Application.load_tasks

namespace :spec do
  task :javascript do
    `bundle exec guard-jasmine`
  end
end

namespace :ci do
  task prepare: ['db:migrate', 'db:test:prepare']
  task suite: ['spec', 'spec:javascript', 'cucumber', 'clean']
  task clean: ['assets:clean', 'tmp:clear']
end

desc "Run the entire test-suite - used for CI"
task suite: ['ci:prepare', 'ci:suite', 'ci:clean']

desc "Notify New Relic RPM about the deploy"
task :deploy_notify do
  `RAILS_ENV=production bundle exec newrelic deployments -u codeship -r \`git rev-parse HEAD\``
end

namespace :baseline do
  task rename: :environment do
    app_name = ENV['APP_NAME'].camelize
    raise "Please set APP_NAME='YourAppName' on the command line" unless app_name
    puts "Renaming TestAngular => #{app_name}"
    dirs = Dir['{config,spec}/**/*.rb'] + %w[Rakefile]
    dirs.each do |path|
      File.open(path, 'r+') do |file|
        baseline_source = file.read
        new_source      = baseline_source.gsub(/TestAngular/, app_name)
        if new_source != baseline_source
          puts "modified #{path}"
          file.rewind
          file.write(new_source)
        end
      end
    end
  end
end

namespace :test_angular do
  def _prompt(query, echo=true)
    print query
    if echo
      $stdin.gets
    else
      $stdin.noecho(&:gets)
      puts
    end
  end

  task create_user: :environment do
    require 'io/console'

    puts "Creating a new user..."
    username = _prompt "Username: "
    name     = _prompt "Full name: "
    email    = _prompt "Email address: "
    password = _prompt "Password: ", false

    user = User.create(username: username, name: name, email: email, password: password)
    puts "Created user #{user.id}"
  end
end
