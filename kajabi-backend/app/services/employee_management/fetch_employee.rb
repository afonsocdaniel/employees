module EmployeeManagement
  class FetchEmployee < ActiveInteraction::Base
    integer :id

    def execute
      response = Net::HTTP.get_response(URI("https://reqres.in/api/users/#{id}"))
      JSON.parse(response.body, symbolize_names: true)
    end
  end
end
