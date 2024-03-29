module Api
  class EmployeesController < ApplicationController
    def index
      outcome = EmployeeManagement::FetchEmployees.run(
        page: params[:page],
        per_page: params[:per_page],
      )

      @employees = outcome.result[:data]
      @page = outcome.result[:page]
      @total = outcome.result[:total]
      @per_page = outcome.result[:per_page]
    end

    def show
      outcome = EmployeeManagement::FetchEmployee.run(id: params[:id])

      if outcome.result.present?
        @employee = outcome.result[:data]
      else
        render json: { error: "Employee not found!" }, status: :not_found
      end
    end
  end
end