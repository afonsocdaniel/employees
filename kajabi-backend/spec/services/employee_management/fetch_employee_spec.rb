require "rails_helper"

describe EmployeeManagement::FetchEmployee do
  describe "default pagination" do
    subject(:outcome) { described_class.run(id: 1) }

    it "returns employee data" do
      VCR.use_cassette("employee") do
        data = outcome.result[:data]

        expect(data[:avatar]).to be_present
        expect(data[:email]).to be_present
        expect(data[:first_name]).to be_present
        expect(data[:last_name]).to be_present
      end
    end
  end
end
