const router = require("express").Router()
const Workout = require("../models/workout")


// GET ROUTES
router.get("api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }
  ])
  .then((dbWorkout) => {
    res.json(dbWorkout)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.get("/api/workouts/range", ({body}, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }
  ])
  .sort({_id: 1}).limit(7)
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err)
  })
})

// PUT ROUTES
router.put("/api/workouts/:id", ({body, params}, res) => {
  Workout.findOneAndUpdate(
    {_id: params.id},
    {
      $push: {
        exercises: body
      }
    },
    {
      new: true
    }
  )
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.json(err)
  })
});


// POST ROUTES
router.post("/api/workouts", ({body}, res) => {
  Workout.create(body)
  .then(dbWorkout => {
    res.json(dbWorkout)
  })
  .catch(err => {
    res.json(err)
  })
});

module.exports = router