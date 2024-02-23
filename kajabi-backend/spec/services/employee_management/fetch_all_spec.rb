require 'rails_helper'

describe EmployeeManagement::FetchAll do
  describe "default pagination" do
    subject(:outcome) { described_class.run }

    it "returns 10 employees per page" do
      VCR.use_cassette("employees_default") do
        data = outcome.result[:data]
        expect(data.count).to eq(10)
      end
    end
  end

  describe "when paginating" do
    let(:per_page) { 2 }
    subject(:outcome) { described_class.run(page: 1, per_page: per_page) }

    it "returns employees based on the per page" do
      VCR.use_cassette("employees_with_pagination") do
        data = outcome.result[:data]
        expect(data.count).to eq(per_page)
      end
    end

    it "returns pagination metadata" do
      VCR.use_cassette("employees") do
        data = outcome.result
        expect(data[:page]).to eq(1)
        expect(data[:per_page]).to eq(2)
        expect(data[:total_pages]).to eq(6)
      end
    end
  end
end
