class Api::Admin::OrdersController < AdminController
  def show
    service = PaymentService.new
    result = service.search(params[:id])

    render json: result
  end
end

