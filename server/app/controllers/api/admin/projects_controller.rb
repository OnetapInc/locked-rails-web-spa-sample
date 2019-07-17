class Api::Admin::ProjectsController < AdminController
  def index
    users = Project.all.order('id DESC')
    users.limit(50)
    render json: {projects: projects}
  end
end

