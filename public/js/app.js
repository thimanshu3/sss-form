var userEmail
var code

$('#verifyEmailForm').submit(function (e) {
    e.preventDefault()
    var email = e.currentTarget.elements.email.value
    if (!email.includes('@technonjr.org'))
        return M.toast({ html: 'Email ID must be College Email ID!' })
    $('#btnSubmit').attr("disabled", true)
    fetch('https://sss-i3-api.herokuapp.com/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (json) {
            $('#btnSubmit').attr("disabled", false)
            if (json.status == 400) {
                return M.toast({ html: json.message })
            }
            if (json.status == 200) {
                M.toast({ html: json.message })
                $('#formContainer').empty()
                $('#formContainer').append(`
                            <form id="verifyCode" class="col s12 m8 offset-m2 l10 offset-l1">
                                <div class="input-field">
                                    <input type="text" name="verificationCode" id="verificationCode" required>
                                    <label for="verificationCode">Verification Code</label>
                                </div>
                                <button id="btnSubmit" class="btn-small waves-effect waves-light" type="submit">
                                    Verify
                                    <i class="material-icons right">send</i>
                                </button>
                            </form>
                        `)
                $('#verifyCode').submit(verifyCode)
                userEmail = email
                code = json.code
            }
            else
                M.toast(json.message || 'Something Went Wrong!')
        })
        .catch(function (err) {
            location.reload()
        })
})

function verifyCode(e) {
    e.preventDefault()
    var verificationCode = e.currentTarget.elements.verificationCode.value
    if (!(verificationCode == code))
        return M.toast({ html: 'Invalid Verification Code!' })
    $('#formContainer').empty()
    $('#formContainer').append(`
                <form id="sendFeedback" class="col s12 m8 offset-m2 l10 offset-l1">
                    <div class="row">
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <span>Email Address</span>
                                    <input type="email" name="email" id="email" value="${userEmail}" disabled required>
                                </div>
                                <div class="input-field">
                                    <input type="text" name="name" id="name" required>
                                    <label for="name">Full Name</label>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>Year</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="year" type="radio" value="1" required />
                                            <span>1st</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="year" type="radio" value="2" required />
                                            <span>2nd</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="year" type="radio" value="3" required />
                                            <span>3rd</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="year" type="radio" value="4" required />
                                            <span>4th</span>
                                        </label>
                                    </p>
                                </div>
                                <hr />
                                <div class="input-field">
                                    <h6>Branch</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="branch" type="radio" value="CSE" required />
                                            <span>CSE</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="branch" type="radio" value="ECE" required />
                                            <span>ECE</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="branch" type="radio" value="ME" required />
                                            <span>ME</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="branch" type="radio" value="CE" required />
                                            <span>CE</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="branch" type="radio" value="EEE" required />
                                            <span>EEE</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="branch" type="radio" value="EE" required />
                                            <span>EE</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <input type="text" name="rollNumber" id="rollNumber" required>
                                    <label for="rollNumber">RTU Roll Number</label>
                                </div>
                                <div class="input-field">
                                    <input type="tel" name="aadharNumber" id="aadharNumber" maxlength="12" minlength="12" required>
                                    <label for="aadharNumber">Aadhar Number</label>
                                </div>
                                <div class="input-field">
                                    <input type="tel" name="phoneNumber" id="phoneNumber" maxlength="10" minlength="10" required>
                                    <label for="phoneNumber">Phone Number</label>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <select name="gender" id="gender" required>
                                        <option value="Female" selected>Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <label>Gender</label>
                                </div>
                                <div class="input-field">
                                    <input type="number" name="age" id="age" min="15" max="25" required>
                                    <label for="age">Age</label>
                                </div>
                                <div class="input-field">
                                    <select name="collegeName" id="collegeName" required>
                                        <option value="Techno India NJR" selected>Techno India NJR</option>
                                    </select>
                                    <label for="collegeName">College</label>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <select name="degreeCurrentlyPursuing" id="degreeCurrentlyPursuing" required>
                                        <option value="Undergraduate" selected>Undergraduate</option>
                                    </select>
                                    <label>What degree program are you pursuing now?</label>
                                </div>
                                <br />
                                <div class="input-field">
                                    <select name="subjectCurrentlyPursuing" id="subjectCurrentlyPursuing" required>
                                        <option value="professional" selected>Professional</option>
                                    </select>
                                    <label>What subject area are you currently pursuing?</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <br />
                            <h5 class="red-text text-lighten-2">Student Satisfaction Survey on Teaching-Learning Process
                            </h5>
                            <h6 class="grey-text text-darken-4">Instructions to fill the questionnaire</h6>
                            <blockquote>
                                <ul>
                                    <li>1. All questions should be compulsorily attempted.</li>
                                    <li>2. Each question has five responses, choose the most appropriate one.</li>
                                    <li>3. The response to the qualitative question no. 21 is the student’s opportunity to
                                        give
                                        suggestions or improvements; she/he can also mention the weaknesses of the institute
                                        here. (Kindly restrict your response to teaching-learning process only)</li>
                                </ul>
                            </blockquote>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>1. How much of the syllabus was covered in the class?</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="syllabusCoveredInClass" type="radio" value="4"
                                                required />
                                            <span>4 – 85% to 100%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="syllabusCoveredInClass" type="radio" value="3"
                                                required />
                                            <span>3 – 70% to 84%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="syllabusCoveredInClass" type="radio" value="2"
                                                required />
                                            <span>2 – 55% to 69%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="syllabusCoveredInClass" type="radio" value="1"
                                                required />
                                            <span>1 – 30% to 54%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="syllabusCoveredInClass" type="radio" value="0"
                                                required />
                                            <span>0 – Below 30%</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>2. How well did the teachers prepare for the classes?</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersPreparedForClass" type="radio" value="4"
                                                required />
                                            <span>4 –Thoroughly</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersPreparedForClass" type="radio" value="3"
                                                required />
                                            <span>3 – Satisfactorily</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersPreparedForClass" type="radio" value="2"
                                                required />
                                            <span>2 – Poorly</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersPreparedForClass" type="radio" value="1"
                                                required />
                                            <span>1 – Indifferently</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersPreparedForClass" type="radio" value="0"
                                                required />
                                            <span>0 – Won’t teach at all</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>3. How well were the teachers able to communicate?</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersAbleToCommunicate" type="radio" value="4"
                                                required />
                                            <span>4 – Always effective</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersAbleToCommunicate" type="radio" value="3"
                                                required />
                                            <span>3 – Sometimes effective</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersAbleToCommunicate" type="radio" value="2"
                                                required />
                                            <span>2 – Just satisfactorily</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersAbleToCommunicate" type="radio" value="1"
                                                required />
                                            <span>1 – Generally ineffective</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersAbleToCommunicate" type="radio" value="0"
                                                required />
                                            <span>0 – Very poor communication</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>4. The teacher’s approach to teaching can best be described as</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersApproachToTeaching" type="radio" value="4"
                                                required />
                                            <span>4 – Excellent</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersApproachToTeaching" type="radio" value="3"
                                                required />
                                            <span>3 – Very good</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersApproachToTeaching" type="radio" value="2"
                                                required />
                                            <span>2 – Good</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersApproachToTeaching" type="radio" value="1"
                                                required />
                                            <span>1 – Fair</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersApproachToTeaching" type="radio" value="0"
                                                required />
                                            <span>0 – Poor</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>5. Fairness of the internal evaluation process by the teachers</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="fairnessOfInternalEvaluation" type="radio"
                                                value="4" required />
                                            <span>4 – Always fair</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="fairnessOfInternalEvaluation" type="radio"
                                                value="3" required />
                                            <span>3 – Usually fair</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="fairnessOfInternalEvaluation" type="radio"
                                                value="2" required />
                                            <span>2 – Sometimes unfair</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="fairnessOfInternalEvaluation" type="radio"
                                                value="1" required />
                                            <span>1 – Usually unfair</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="fairnessOfInternalEvaluation" type="radio"
                                                value="0" required />
                                            <span>0 – Unfair</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>6. Was your performance in assignments discussed with you?</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="performanceInAssignmentsDisccused" type="radio"
                                                value="4" required />
                                            <span>4 – Every time</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="performanceInAssignmentsDisccused" type="radio"
                                                value="3" required />
                                            <span>3 – Usually</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="performanceInAssignmentsDisccused" type="radio"
                                                value="2" required />
                                            <span>2 – Occasionally/Sometimes</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="performanceInAssignmentsDisccused" type="radio"
                                                value="1" required />
                                            <span>1 – Rarely</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="performanceInAssignmentsDisccused" type="radio"
                                                value="0" required />
                                            <span>0 – Never</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>7. The institute takes an active interest in promoting internship, student exchange,
                                        field visit opportunities for
                                        students.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteTakesActiveInterestInInternships"
                                                type="radio" value="4" required />
                                            <span>4 – Regularly</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteTakesActiveInterestInInternships"
                                                type="radio" value="3" required />
                                            <span>3 – Often</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteTakesActiveInterestInInternships"
                                                type="radio" value="2" required />
                                            <span>2 – Sometimes</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteTakesActiveInterestInInternships"
                                                type="radio" value="1" required />
                                            <span>1 – Rarely</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteTakesActiveInterestInInternships"
                                                type="radio" value="0" required />
                                            <span>0 – Never</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>8. The teaching and mentoring process in your institution facilitates you in
                                        cognitive, social and emotional growth.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachingAndMentoringProcessFaciliatesGrowth"
                                                type="radio" value="4" required />
                                            <span>4 – Significantly</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachingAndMentoringProcessFaciliatesGrowth"
                                                type="radio" value="3" required />
                                            <span>3 – Very well</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachingAndMentoringProcessFaciliatesGrowth"
                                                type="radio" value="2" required />
                                            <span>2 – Moderately</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachingAndMentoringProcessFaciliatesGrowth"
                                                type="radio" value="1" required />
                                            <span>1 – Marginally</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachingAndMentoringProcessFaciliatesGrowth"
                                                type="radio" value="0" required />
                                            <span>0 – Not at all</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>9. The institution provides multiple opportunities to learn and grow.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="multipleOpportunitiesToLearnGrow" type="radio"
                                                value="4" required />
                                            <span>4 – Strongly agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="multipleOpportunitiesToLearnGrow" type="radio"
                                                value="3" required />
                                            <span>3 – Agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="multipleOpportunitiesToLearnGrow" type="radio"
                                                value="2" required />
                                            <span>2 – Neutral</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="multipleOpportunitiesToLearnGrow" type="radio"
                                                value="1" required />
                                            <span>1 – Disagree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="multipleOpportunitiesToLearnGrow" type="radio"
                                                value="0" required />
                                            <span>0 – Strongly disagree</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>10. Teachers inform you about your expected competencies, course outcomes and
                                        programme outcomes</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersInformAboutExpectedCompetencies"
                                                type="radio" value="4" required />
                                            <span>4 – Every time</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersInformAboutExpectedCompetencies"
                                                type="radio" value="3" required />
                                            <span>3 – Usually</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersInformAboutExpectedCompetencies"
                                                type="radio" value="2" required />
                                            <span>2 – Occasionally/Sometimes</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersInformAboutExpectedCompetencies"
                                                type="radio" value="1" required />
                                            <span>1 – Rarely</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersInformAboutExpectedCompetencies"
                                                type="radio" value="0" required />
                                            <span>0 – Never</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>11. Your mentor does a necessary follow-up with an assigned task to you.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="mentorDoesFollowUp" type="radio" value="4"
                                                required />
                                            <span>4 – Every time</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="mentorDoesFollowUp" type="radio" value="3"
                                                required />
                                            <span>3 – Usually</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="mentorDoesFollowUp" type="radio" value="2"
                                                required />
                                            <span>2 – Occasionally/Sometimes</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="mentorDoesFollowUp" type="radio" value="1"
                                                required />
                                            <span>1 – Rarely</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="mentorDoesFollowUp" type="radio" value="0"
                                                required />
                                            <span>0 – I don’t have a mentor</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>12. The teachers illustrate the concepts through examples and applications.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIllustrateConceptsExamples" type="radio"
                                                value="4" required />
                                            <span>4 – Every time</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIllustrateConceptsExamples" type="radio"
                                                value="3" required />
                                            <span>3 – Usually</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIllustrateConceptsExamples" type="radio"
                                                value="2" required />
                                            <span>2 – Occasionally/Sometimes</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIllustrateConceptsExamples" type="radio"
                                                value="1" required />
                                            <span>1– Rarely</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIllustrateConceptsExamples" type="radio"
                                                value="0" required />
                                            <span>0 – Never</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>13. The teachers identify your strengths and encourage you with providing the right
                                        level of challenges.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyStrength" type="radio" value="4"
                                                required />
                                            <span>4 – Fully</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyStrength" type="radio" value="3"
                                                required />
                                            <span>3 – Reasonably</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyStrength" type="radio" value="2"
                                                required />
                                            <span>2 – Partially</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyStrength" type="radio" value="1"
                                                required />
                                            <span>1 – Slightly</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyStrength" type="radio" value="0"
                                                required />
                                            <span>0 – Unable to</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>14. Teachers are able to identify your weaknesses and help you to overcome them.
                                    </h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyWeakness" type="radio" value="4"
                                                required />
                                            <span>4 – Every time</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyWeakness" type="radio" value="3"
                                                required />
                                            <span>3 – Usually</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyWeakness" type="radio" value="2"
                                                required />
                                            <span>2 – Occasionally/Sometimes</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyWeakness" type="radio" value="1"
                                                required />
                                            <span>1 – Rarely</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="teachersIdentifyWeakness" type="radio" value="0"
                                                required />
                                            <span>0 – Never</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>15. The institution makes effort to engage students in the monitoring, review and
                                        continuous quality improvement of the
                                        teaching-learning process.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteMakeEffortsToEngageStudents" type="radio"
                                                value="4" required />
                                            <span>4 – Strongly agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteMakeEffortsToEngageStudents" type="radio"
                                                value="3" required />
                                            <span>3 – Agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteMakeEffortsToEngageStudents" type="radio"
                                                value="2" required />
                                            <span>2 – Neutral</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteMakeEffortsToEngageStudents" type="radio"
                                                value="1" required />
                                            <span>1 – Disagree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteMakeEffortsToEngageStudents" type="radio"
                                                value="0" required />
                                            <span>0 – Strongly disagree</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>16. The institute/ teachers use student-centric methods, such as experiential
                                        learning, participative learning and
                                        problem-solving methodologies for enhancing learning experiences.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteUseStudentCentricMethods" type="radio"
                                                value="4" required />
                                            <span>4 – To a great extent</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteUseStudentCentricMethods" type="radio"
                                                value="3" required />
                                            <span>3 – Moderate</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteUseStudentCentricMethods" type="radio"
                                                value="2" required />
                                            <span>2 – Some what</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteUseStudentCentricMethods" type="radio"
                                                value="1" required />
                                            <span>1 – Very little</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="instituteUseStudentCentricMethods" type="radio"
                                                value="0" required />
                                            <span>0 – Not at all</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>17. Teachers encourage you to participate in extracurricular activities.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap"
                                                name="teachersEncourageToParticipateExtracurricularActivities" type="radio"
                                                value="4" required />
                                            <span>4 – Strongly agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap"
                                                name="teachersEncourageToParticipateExtracurricularActivities" type="radio"
                                                value="3" required />
                                            <span>3 – Agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap"
                                                name="teachersEncourageToParticipateExtracurricularActivities" type="radio"
                                                value="2" required />
                                            <span>2 – Neutral</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap"
                                                name="teachersEncourageToParticipateExtracurricularActivities" type="radio"
                                                value="1" required />
                                            <span>1 – Disagree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap"
                                                name="teachersEncourageToParticipateExtracurricularActivities" type="radio"
                                                value="0" required />
                                            <span>0 – Strongly disagree</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>18. Efforts are made by the institute/ teachers to inculcate soft skills, life
                                        skills and employability skills to make
                                        you ready for the world of work.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="effortsMadeByInstituteForSoftSkills" type="radio"
                                                value="4" required />
                                            <span>4 – To a great extent</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="effortsMadeByInstituteForSoftSkills" type="radio"
                                                value="3" required />
                                            <span>3 – Moderate</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="effortsMadeByInstituteForSoftSkills" type="radio"
                                                value="2" required />
                                            <span>2 – Some what</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="effortsMadeByInstituteForSoftSkills" type="radio"
                                                value="1" required />
                                            <span>1 – Very little</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="effortsMadeByInstituteForSoftSkills" type="radio"
                                                value="0" required />
                                            <span>0 – Not at all</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>19. What percentage of teachers use ICT tools such as LCD projector, Multimedia,
                                        etc. while teaching.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="percentageOfTeachersUseICTTools" type="radio"
                                                value="4" required />
                                            <span>4 – Above 90%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="percentageOfTeachersUseICTTools" type="radio"
                                                value="3" required />
                                            <span>3 – 70 – 89%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="percentageOfTeachersUseICTTools" type="radio"
                                                value="2" required />
                                            <span>2 – 50 – 69%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="percentageOfTeachersUseICTTools" type="radio"
                                                value="1" required />
                                            <span>1 – 30 – 49%</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="percentageOfTeachersUseICTTools" type="radio"
                                                value="0" required />
                                            <span>0 – Below 29%</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>20. The overall quality of the teaching-learning process in your institute is very
                                        good.</h6>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="overallQualityOfTeachingLearningProcess"
                                                type="radio" value="4" required />
                                            <span>4 –Strongly agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="overallQualityOfTeachingLearningProcess"
                                                type="radio" value="3" required />
                                            <span>3 – Agree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="overallQualityOfTeachingLearningProcess"
                                                type="radio" value="2" required />
                                            <span>2 – Neutral</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="overallQualityOfTeachingLearningProcess"
                                                type="radio" value="1" required />
                                            <span>1 – Disagree</span>
                                        </label>
                                    </p>
                                    <p>
                                        <label>
                                            <input class="with-gap" name="overallQualityOfTeachingLearningProcess"
                                                type="radio" value="0" required />
                                            <span>0 – Strongly disagree</span>
                                        </label>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12">
                            <div class="card-panel">
                                <div class="input-field">
                                    <h6>
                                        21. Give three observation/suggestions to improve the overall teaching-learning
                                        experience in your institution.
                                    </h6>
                                    <textarea id="observationsAndSuggestion" class="materialize-textarea"></textarea>
                                </div>
                            </div>
                        </div>
                        <button id="btnSubmit" class="btn waves-effect waves-light" type="submit">
                            Submit
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            `)
    $('select').formSelect()
    $('#sendFeedback').submit(sendFeedback)
}

function sendFeedback(e) {
    e.preventDefault()
    var elements = e.currentTarget.elements
    var data = {
        email: userEmail,
        name: elements.name.value,
        year: $("input[name='year']:checked").val(),
        branch: $("input[name='branch']:checked").val(),
        rollNumber: elements.rollNumber.value,
        aadharNumber: elements.aadharNumber.value,
        phoneNumber: elements.phoneNumber.value,
        gender: elements.gender.value,
        age: elements.age.value,
        collegeName: elements.collegeName.value,
        degreeCurrentlyPursuing: elements.degreeCurrentlyPursuing.value,
        subjectCurrentlyPursuing: elements.subjectCurrentlyPursuing.value,
        syllabusCoveredInClass: $("input[name='syllabusCoveredInClass']:checked").val(),
        teachersPreparedForClass: $("input[name='teachersPreparedForClass']:checked").val(),
        teachersAbleToCommunicate: $("input[name='teachersAbleToCommunicate']:checked").val(),
        teachersApproachToTeaching: $("input[name='teachersApproachToTeaching']:checked").val(),
        fairnessOfInternalEvaluation: $("input[name='fairnessOfInternalEvaluation']:checked").val(),
        performanceInAssignmentsDisccused: $("input[name='performanceInAssignmentsDisccused']:checked").val(),
        instituteTakesActiveInterestInInternships: $("input[name='instituteTakesActiveInterestInInternships']:checked").val(),
        teachingAndMentoringProcessFaciliatesGrowth: $("input[name='teachingAndMentoringProcessFaciliatesGrowth']:checked").val(),
        multipleOpportunitiesToLearnGrow: $("input[name='multipleOpportunitiesToLearnGrow']:checked").val(),
        teachersInformAboutExpectedCompetencies: $("input[name='teachersInformAboutExpectedCompetencies']:checked").val(),
        mentorDoesFollowUp: $("input[name='mentorDoesFollowUp']:checked").val(),
        teachersIllustrateConceptsExamples: $("input[name='teachersIllustrateConceptsExamples']:checked").val(),
        teachersIdentifyStrength: $("input[name='teachersIdentifyStrength']:checked").val(),
        teachersIdentifyWeakness: $("input[name='teachersIdentifyWeakness']:checked").val(),
        instituteMakeEffortsToEngageStudents: $("input[name='instituteMakeEffortsToEngageStudents']:checked").val(),
        instituteUseStudentCentricMethods: $("input[name='instituteUseStudentCentricMethods']:checked").val(),
        teachersEncourageToParticipateExtracurricularActivities: $("input[name='teachersEncourageToParticipateExtracurricularActivities']:checked").val(),
        effortsMadeByInstituteForSoftSkills: $("input[name='effortsMadeByInstituteForSoftSkills']:checked").val(),
        percentageOfTeachersUseICTTools: $("input[name='percentageOfTeachersUseICTTools']:checked").val(),
        overallQualityOfTeachingLearningProcess: $("input[name='overallQualityOfTeachingLearningProcess']:checked").val(),
        observationsAndSuggestion: $('#observationsAndSuggestion').val(),
    }
    $('#btnSubmit').attr("disabled", true)
    fetch('https://sss-i3-api.herokuapp.com/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(function (res) {
            return res.json()
        })
        .then(function (json) {
            $('#btnSubmit').attr("disabled", false)
            if (json.status == 201) {
                M.toast({ html: 'Feedback Submitted Successfully!' })
                $('#formContainer').empty()
                $('#formContainer').append(`
                            <div class="card-panel">
                                <h5 class="center-align">Thank You For Taking Part of this Survey.</h5>
                            </div>
                        `)
            } else {
                M.toast({ html: json.message || 'Something Went Wrong!' })
                setTimeout(() => location.reload(), 1000)
            }
        })
        .catch(function (err) {
            location.reload()
        })
}