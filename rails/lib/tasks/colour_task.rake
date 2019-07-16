namespace :color_task do
  desc "create examples db data"
  task :create => :environment do
    db_length = Example.count
    20.times do |time|
      color_string = Faker::Color.hex_color
      name_string = Faker::Name.name
      Example.create(name: name_string, color: color_string, position_id: db_length + time)
    end
  end
end
