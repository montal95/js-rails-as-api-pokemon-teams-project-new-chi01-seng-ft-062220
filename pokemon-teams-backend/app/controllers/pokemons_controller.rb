# frozen_string_literal: true

class PokemonsController < ApplicationController
  def destroy
    Pokemon.find(params[:id]).destroy
    render json: {status: 200}
  end
end
