import { Factory } from 'ember-cli-mirage';

// We assume that the probabilities add up to 1
const getRandomNumber = (pdf) => {
    const randomValue = Math.random();
    let sum = 0;

    for (let i = 0; i < pdf.length; i++) {
        sum += pdf[i].probability;

        if (randomValue < sum) {
            return pdf[i].value;
        }
    }
};

// allIds is an array of strings (can be numbers)
const sampleWithoutRepetition = (allIds, numSamples) => {
    const sampledIds = [];

    if (numSamples <= allIds.length) {
        while (sampledIds.length < numSamples) {
            const index = Math.floor(allIds.length * Math.random());
            const id = allIds[index];

            if (!sampledIds.includes(id)) {
                sampledIds.push(id);
            }
        }
    }

    return sampledIds;
};

export default Factory.extend({
    /*************************************************************************************

        Model relationships

    *************************************************************************************/
    afterCreate(resume, server) {
        // Assign degrees
        const allDegreeIds = server.db.degrees.mapBy('id');

        const numDegrees = getRandomNumber([
            { value: 1, probability: 0.65 },
            { value: 2, probability: 0.25 },
            { value: 3, probability: 0.10 },
        ]);

        resume.degreeIds = sampleWithoutRepetition(allDegreeIds, numDegrees);

        // Assign experiences
        const allExperienceIds = server.db.experiences.mapBy('id');

        const numExperiences = getRandomNumber([
            { value: 1, probability: 0.10 },
            { value: 2, probability: 0.20 },
            { value: 3, probability: 0.25 },
            { value: 4, probability: 0.35 },
            { value: 5, probability: 0.10 },
        ]);

        resume.experienceIds = sampleWithoutRepetition(allExperienceIds, numExperiences);

        // Assign skills
        const allSkillIds = server.db.skills.mapBy('id');

        const numSkills = getRandomNumber([
            { value: 3, probability: 0.05 },
            { value: 4, probability: 0.05 },
            { value: 5, probability: 0.10 },
            { value: 6, probability: 0.15 },
            { value: 7, probability: 0.15 },
            { value: 8, probability: 0.20 },
            { value: 9, probability: 0.10 },
            { value: 10, probability: 0.10 },
            { value: 11, probability: 0.05 },
            { value: 12, probability: 0.05 },
        ]);

        resume.skillIds = sampleWithoutRepetition(allSkillIds, numSkills);

        // Save skills
        resume.save();
    },
});