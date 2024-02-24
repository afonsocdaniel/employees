require "rails_helper"

describe "Employee API", type: :request do
  describe "GET /v1/employees" do
    let(:per_page) { 2 }
    let(:response_body) { JSON.parse(response.body) }
    let(:employee_data) { response_body["employees"][0] }

    it "returns all employees data" do
      VCR.use_cassette("employees_with_pagination") do
        get "/api/employees", params: { 'page' => 1, 'per_page' => per_page }

        expect(response).to have_http_status(:success)
        expect(response_body["employees"].count).to eql(per_page)

        expect(employee_data["id"]).to eql(1)
        expect(employee_data["email"]).to eql("george.bluth@reqres.in")
        expect(employee_data["first_name"]).to eql("George")
        expect(employee_data["last_name"]).to eql("Bluth")
        expect(employee_data["avatar"]).to eql("https://reqres.in/img/faces/1-image.jpg")
      end
    end

    it "returns pagination metadata" do
      VCR.use_cassette("employees_with_pagination") do
        get "/api/employees", params: { 'page' => 1, 'per_page' => per_page }

        expect(response).to have_http_status(:success)
        expect(response_body["pagination"]["page"]).to eql(1)
        expect(response_body["pagination"]["total"]).to eql(12)
        expect(response_body["pagination"]["per_page"]).to eql(2)
      end
    end
  end

  describe "GET /v1/employees/:id" do
    describe "given an existing employee" do
      let(:employee_id) { 1 }
      let(:response_body) { JSON.parse(response.body) }
      let(:employee_data) { response_body["employee"] }

      it "returns employee data" do
        VCR.use_cassette("employee") do
          get "/api/employees/#{employee_id}"

          expect(response).to have_http_status(:success)
          expect(employee_data["id"]).to eql(1)
          expect(employee_data["email"]).to eql("george.bluth@reqres.in")
          expect(employee_data["first_name"]).to eql("George")
          expect(employee_data["last_name"]).to eql("Bluth")
          expect(employee_data["avatar"]).to eql("https://reqres.in/img/faces/1-image.jpg")
        end
      end
    end

    describe "given an non existing employee" do
      let(:employee_id) { "xpto" }
      let(:response_body) { JSON.parse(response.body) }
      let(:employee_data) { response_body["employee"] }

      it "returns employee data" do
        VCR.use_cassette("employee_not_found") do
          get "/api/employees/#{employee_id}"

          expect(response).to have_http_status(:not_found)
          expect(response_body["error"]).to eq("Employee not found!")
        end
      end
    end
  end
end
