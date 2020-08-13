# frozen_string_literal: true

class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: trainers.to_json(
      include: {
        pokemon: {
          only: %i[id species nickname trainer_id]
        }
      }
    )
  end

  def catch
    trainer = Trainer.find_by(id: params[:id])
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    new_pokemon = trainer.pokemon.create(nickname: name, species: species)
    render json: new_pokemon
  end
end
