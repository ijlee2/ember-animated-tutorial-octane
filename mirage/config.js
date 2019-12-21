export default function() {
    /*
        Shorthand cheatsheet:

        this.get('/posts');
        this.post('/posts');
        this.get('/posts/:id');
        this.put('/posts/:id'); // or this.patch
        this.del('/posts/:id');

        https://www.ember-cli-mirage.com/docs/advanced/shorthands
    */

    this.get('/students', { timing: 500 });
    this.get('/students/:id', { timing: 500 });

    this.get('/skills', { timing: 500 });

    this.get('/search', (schema, request) => {
        const desiredSkillIds = request.queryParams.skillIds.split(',');

        // Find the skills that the students must meet
        const desiredSkills = schema.db.skills
            .filter(skill => {
                return desiredSkillIds.includes(skill.id);
            })
            .reduce((accumulator, { name, synonyms }) => {
                accumulator.push(name.toLowerCase());

                if (synonyms) {
                    synonyms.forEach(synonym => accumulator.push(synonym.toLowerCase()));
                }

                return accumulator;

            }, []);

        // Find the students that meet the skills
        const minScore = 0;
        let maxScore = 1;

        const students = schema.db.students.reduce((accumulator, student) => {
            // We assume that each student has only 1 resume
            const resume = schema.db.resumes.find(student.resumeIds[0]);

            // Check the student's experiences
            let scoreFromExperiences = 0;

            const relevantExperiences = resume.experienceIds.reduce((accumulator, experienceId) => {
                const experience = schema.db.experiences.find(experienceId);

                // Check the title
                let isTitleRelevant = false;

                const title = experience.title.split(/\s+/).map(word => {
                    if (desiredSkills.includes(word.toLowerCase())) {
                        isTitleRelevant = true;

                        scoreFromExperiences++;

                        return `<span class="highlighted">${word}</span>`;
                    }

                    return word;

                }).join(' ');

                // Check the achievements
                const relevantAchievements = experience.achievements.reduce((accumulator, achievement) => {
                    let isAchievementRelevant = false;

                    const words = achievement.trim().split(/\s+/);
                    const highlightedWords = [];

                    words.forEach((word, index) => {
                        if (desiredSkills.includes(word.toLowerCase())) {
                            isAchievementRelevant = true;

                            // Consider words in the beginning to be more important. We map
                            // the domain of relative position, [0, 1], to the range of score,
                            // [1, 0] in a smooth manner.
                            const relativePosition = index / words.length;
                            scoreFromExperiences += 1 + Math.log10(1 - 0.9 * relativePosition);

                            highlightedWords.push(`<span class="highlighted">${word}</span>`);

                        } else {
                            highlightedWords.push(word);

                        }
                    });

                    if (isAchievementRelevant) {
                        accumulator.push(highlightedWords.join(' '));
                    }

                    return accumulator;

                }, []);

                // Check if the experience is relevant
                if (relevantAchievements.length > 0) {
                    accumulator.push({
                        title,
                        company: experience.company,
                        achievements: relevantAchievements,
                    });

                } else if (isTitleRelevant) {
                    accumulator.push({
                        title,
                        company: experience.company,
                        achievements: experience.achievements,
                    });

                }

                return accumulator;

            }, []);

            // Check the student's skills
            let scoreFromSkills = 0;

            const relevantSkills = resume.skillIds.reduce((accumulator, id) => {
                if (desiredSkillIds.includes(id)) {
                    scoreFromSkills += 0.5;

                    const skill = schema.db.skills.find(id);

                    accumulator.push({
                        name: `<span class="highlighted">${skill.name}</span>`,
                        category: skill.category,
                    });
                }

                return accumulator;

            }, []);

            // Check if the student is qualified
            const score = scoreFromExperiences + scoreFromSkills;

            if (score > 0) {
                maxScore = Math.max(score, maxScore);

                accumulator.push({
                    id: student.id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    fullName: `${student.firstName} ${student.lastName}`,

                    metadata: {
                        score,
                        experiences: relevantExperiences,
                        skills: relevantSkills,
                    },
                });
            }

            return accumulator;

        }, []);

        students.forEach(student => {
            // Create a score between 0 and 99
            let relativeScore = Math.floor(99 * (student.metadata.score - minScore) / (maxScore - minScore));
            const numDigits = relativeScore.toString().length;

            relativeScore = `${'0'.repeat(2 - numDigits)}${relativeScore}`;

            student.metadata.relativeScore = relativeScore;
        });

        return students;
    });
}