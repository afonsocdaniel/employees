module EmployeeManagement
  class FetchEmployees < ActiveInteraction::Base
    integer :page, default: 1
    integer :per_page, default: 10

    def execute
      response = Net::HTTP.get_response(URI("https://reqres.in/api/users?page=#{page}&per_page=#{per_page}"))
      JSON.parse(response.body, symbolize_names: true)
    end
  end
end
