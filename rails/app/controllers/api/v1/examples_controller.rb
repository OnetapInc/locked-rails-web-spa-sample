module Api
  module V1
    class ExamplesController < ApplicationController
      def index
        examples = Example.all.select(:id, :name, :color, :position_id)
        render json: examples
      end
      def new
        count = Example.count
        Example.create(name: params[:name], color: params[:color], position_id: count)
      end
      def destroy
        puts 'delete method in'
        example = Example.find(params[:id])
        if !example
          render json: { status: 'FAIL', message: 'not exists'}
        else
          example.destroy
          render json: { status: 'SUCCESS!', message: 'data delete'}
        end
      end
      def change
        puts 0
        puts params
        old_example = Example.find_by(position_id: params[:oldIndex])
        puts 1
        puts old_example.inspect
        new_example = Example.find_by(position_id: params[:newIndex])
        puts 2
        puts new_example.inspect
        old_example.update_attribute(:position_id, params[:newIndex])
        puts 3
        puts old_example.inspect
        new_example.update_attribute(:position_id, params[:oldIndex])
        puts new_example.inspect
      end
    end
  end
end