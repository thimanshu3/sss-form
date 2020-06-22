const { DataTypes } = require('sequelize')

const MySql = require('../db')

const Feedback = MySql.define('feedback', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rollNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aadharNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    collegeName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    degreeCurrentlyPursuing: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subjectCurrentlyPursuing: {
        type: DataTypes.STRING,
        allowNull: false
    },

    syllabusCoveredInClass: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersPreparedForClass: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersAbleToCommunicate: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersApproachToTeaching: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fairnessOfInternalEvaluation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    performanceInAssignmentsDisccused: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instituteTakesActiveInterestInInternships: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachingAndMentoringProcessFaciliatesGrowth: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    multipleOpportunitiesToLearnGrow: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersInformAboutExpectedCompetencies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    mentorDoesFollowUp: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersIllustrateConceptsExamples: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersIdentifyStrength: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersIdentifyWeakness: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instituteMakeEffortsToEngageStudents: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    instituteUseStudentCentricMethods: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    teachersEncourageToParticipateExtracurricularActivities: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    effortsMadeByInstituteForSoftSkills: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    percentageOfTeachersUseICTTools: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    overallQualityOfTeachingLearningProcess: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    observationsAndSuggestion: {
        type: DataTypes.STRING(5119),
        allowNull: false
    }
})

module.exports = Feedback

Feedback.sync({ force: process.env.NODE_ENV === 'production' ? false : true })