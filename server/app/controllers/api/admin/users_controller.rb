class Api::Admin::UsersController < AdminController
  def index
    query = params[:q]
    if query =~ /^[0-9]+$/
      users = User.where(id: query).order('id DESC')
    elsif query.present?
      users = User.where('name LIKE ? or email LIKE ?', query + '%', query + '%').order('id DESC')
    else
      users = User.all.order('id DESC')
    end

    users.limit(50)
    render json: {users: users.as_json(all:true)}
  end

  def show
    uid = params[:id]
    user = User.preload(
      [:follows, :backers, :members, :user_authentication, :post_pack_payments]
    ).find(uid)
    user_json = user.as_json(
      all: true,
      include: {
        follows: {
          include: {
            project: {}
          }
        },
        post_pack_payments: {},
        payment_method: {},
        user_authentication: {},
        members: {
          include: {
            project: {}
          }
        },
        backers: {
          include: {
            plan: {
              include: [:project]
            }
          }
        }
      }
    )
    user_json[:plan_payments] = user
                                  .plan_payments
                                  .order('id DESC')
                                  .as_json(include: {plan: {include: :project}})
    render json: {
      user: user_json
    }
  end
end
