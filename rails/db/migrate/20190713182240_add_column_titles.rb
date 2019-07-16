class AddColumnTitles < ActiveRecord::Migration[5.2]
  def change
    add_column :examples, :position_id, :string  
  end
end
