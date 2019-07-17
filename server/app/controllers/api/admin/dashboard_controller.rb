class Api::Admin::DashboardController < AdminController
  def index
    user_count = User.all.count
    project_count = Project.all.count
    backer_count = Backer.all.count
    unique_backer_count = Backer.count('distinct user_id')
    render json: {
      user_count: user_count,
      project_count: project_count,
      backer_count: backer_count,
      unique_backer_count: unique_backer_count,
    }
  end
end

