import express from "express";
import tourSchema from "../schemas/tour.js";
// import mongoose from "mongoose";

//getAlltour feature:
//READ
// async function getAllTour(req, res) {
//   try {
//     const tours = await tourSchema.find();

//     if (tours.length == 0) {
//       return res.status(200).json({
//         success: "true",
//         message: "Not Founded Any tours ☹️",
//         tours: tours,
//       });
//     }
//     return res.status(200).json({
//       success: "true",
//       message: "Founded successFully 😊",
//       tours: tours,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       success: "false",
//       message: "Something went Wrong. Check the console for error!",
//       tour: "null",
//     });
//   }
// }

//updating getallTour for implementing pagination:
async function getAllTour(req, res) {
  const { page } = req.query;

  try {
    const limit = 3;
    const si = (parseInt(page) - 1) * limit; //why? : page*limit - 1;

    const total = await tourSchema.countDocuments({});

    const tours = await tourSchema.find().limit(limit).skip(si);

    if (tours.length == 0) {
      return res.status(200).json({
        success: "true",
        message: "Not Founded Any tours ☹️",
        // currentPage: page,
        noOfPages: Math.ceil(total / limit),
        tours: tours,
      });
    }
    return res.status(200).json({
      success: "true",
      message: "Founded successFully 😊",
      // currentPage: page,
      noOfPage: Math.ceil(total / limit),
      tours: tours,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tour: "null",
    });
  }
}

//read tour based on details:
async function getTourById(req, res) {
  // console.log("I run getTourById!");
  const { id } = req.params;

  try {
    const tour = await tourSchema.findById({ _id: id });

    if (tour) {
      return res.status(200).json({
        success: "true",
        message: "Founded successFully 😊",
        tour: tour,
      });
    } else {
      return res.status(200).json({
        success: "true",
        message: "Not Founded Any tours ☹️",
        tours: tours,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error! getTourById",
      tour: "null",
    });
  }
}

//read based on only user's created tour:

async function getTourByUserId(req, res) {
  const id = req.userId;
  console.log(id);

  try {
    const userTours = await tourSchema.find({ authorId: id });
    // const userTours = [];

    if (userTours.length == 0) {
      return res.status(200).json({
        success: "true",
        message: "Not Founded Any tours ☹️",
        tours: userTours,
      });
    }
    return res.status(200).json({
      success: "true",
      message: "Founded successFully 😊",
      tours: userTours,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message:
        "Something went Wrong. Check the console for error GetTourByUserID!",
      tour: "null",
    });
  }
}

//CREATE
//addnewtour feature:
async function createNewTour(req, res) {
  try {
    const tour = req.body;

    console.log(tour);
    //first bnao
    const newTour = new tourSchema({
      ...tour,
      createdAt: new Date().toISOString(),
      authorId: req.userId,
    });

    //then save:
    await newTour.save();

    //schema.create() : bnao + save();

    return res.status(201).json({
      success: "true",
      message: "Tour Added Succesfully ✔️",
      tour: newTour,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tour: "null",
    });
  }
}

//DELET
const delTour = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTour = await tourSchema.findByIdAndDelete({ _id: id });

    if (!deletedTour) {
      return res.status(200).json({
        success: "true",
        message: "No Tour Exist with this Id!",
        tour: deletedTour,
      });
    }
    return res.status(200).json({
      success: "true",
      message: "Tour Deleted Succesfully 🚮 ",
      tour: deletedTour,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tour: "null",
    });
  }
};

//UPDATE: U
const updateTour = async (req, res) => {
  // console.log("i run updateTour!");
  const tour = req.body;
  const { id } = req.params;
  const userId = req.userId;
  try {
    if (!tour) {
      return res.status(201).json({
        success: "false",
        message: "No data for updating! ",
        tour: "null",
      });
    }

    // console.log(tour);

    const updatedTour = await tourSchema.findByIdAndUpdate({ _id: id }, tour, {
      new: true,
    });

    if (!updateTour) {
      return res.status(201).json({
        success: "false",
        message: "No tour found with this Id 😵 ",
        tour: updatedTour,
      });
    }

    return res.status(201).json({
      success: "true",
      message: "Tour Updated Succesfully ✔️ ",
      tour: updatedTour,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tour: "null",
    });
  }
};

const getTourBySearch = async (req, res) => {
  const title = new RegExp(req.query.title, "i"); //i: i-ncasesensitive:

  try {
    const foundTours = await tourSchema.find({ title: title });
    if (!foundTours) {
      return res.status(200).json({
        success: "false",
        message: "No tours found with this title 😵 ",
        tours: foundTours,
      });
    }
    return res.status(201).json({
      success: "true",
      message: `Founded tour's with ${req.query.title}`,
      tours: foundTours,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tours: "null",
    });
  }
};

//search using params:
const getTourByTag = async (req, res) => {
  // const title = new RegExp(req.query.title, "i"); //i: i-ncasesensitive:
  const { tagV } = req.params;

  try {
    const foundTours = await tourSchema.find({ tags: { $in: tagV } });
    if (!foundTours) {
      return res.status(200).json({
        success: "false",
        message: "No tours found with this Tag 😵 ",
        tours: foundTours,
      });
    }
    return res.status(201).json({
      success: "true",
      message: `Founded tour's with tag value ${tagV}`,
      tours: foundTours,
    });
  } catch (error) {
    console.log(err);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tours: "null",
    });
  }
};

const getRelatedTours = async (req, res) => {
  const tags = req.body;
  // console.log(tags);
  try {
    const relatedTours = await tourSchema.find({ tags: { $in: tags } });
    if (!relatedTours) {
      return res.status(200).json({
        success: "false",
        message: "No Related tours found with these Tags 😵 ",
        tours: foundTours,
      });
    }

    return res.status(201).json({
      success: "true",
      message: `related Tours Founded!`,
      tours: relatedTours,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tours: "null",
    });
  }
};

const updateLike = async (req, res) => {
  const { id, likeCount } = req.body;
  // console.log(req.body);
  try {
    const updatedLikeTour = await tourSchema.findByIdAndUpdate(
      { _id: id },
      { likeCount: likeCount + 1 },
      { new: true }
    );

    if (!updatedLikeTour) {
      return res.status(200).json({
        success: "false",
        message: "Cannot find Tour with this id 😵 ",
        tour: null,
      });
    }

    return res.status(201).json({
      success: "true",
      message: `You have liked the tour 💗!`,
      tour: updatedLikeTour,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: "false",
      message: "Something went Wrong. Check the console for error!",
      tour: "null",
    });
  }
};

export {
  createNewTour,
  getAllTour,
  getTourById,
  getTourByUserId,
  delTour,
  updateTour,
  getTourBySearch,
  getTourByTag,
  getRelatedTours,
  updateLike,
};
