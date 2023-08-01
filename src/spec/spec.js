const myModule = require('../functions/generalFunction');
const fs = require('fs');
const axios = require('axios');

const filePath = './src/files/question.json';
const third_party_learing_point_id = 27920
const getPracticeTestUrl = `https://staging.sparkbackend.cerebry.co/api/v4/partner/topic/${third_party_learing_point_id}/fetch-question/`
const submitPracticeTestUrl = `https://staging.sparkbackend.cerebry.co/api/v4/partner/topic/${third_party_learing_point_id}/submit-response/`
const number = 0

// check if the file exist or not, if not, create the file
// fs.access(filePath, fs.constants.F_OK, (err) => {
//   if (err) {
//     const data = {
//         "practiceTest": {
//             "questions": {

//             }
//         }
//       };
//     const jsonData = JSON.stringify(data, null, 2);

//     try {
//     fs.writeFileSync(filePath, jsonData);
//     console.log("File has been saved.");
//     } catch (error) {
//     console.error(err);
//     }


//   } else {

//     // If the file already existed, call getCerebryToken
//     myModule.getCerebryToken(() => {
//       const cerebryToken = responseData

//       async function getPracticetest(callback) {
//         try {
//             const apiUrl = getPracticeTestUrl;

//             const response = await axios.get(apiUrl, {
//             headers: {
//                 'authorization': `jwt ${cerebryToken}`
//             }
//             });

//             cerebryQuestionId = response.data.question.id; // Assign the response data to the variable
//             callback(cerebryQuestionId); // Call the callback function with the API data

//         } catch (error) {
//             console.error('Error making API call:', error.message)
//         }
//         }

//         function checkIfContains(filePath, str) {
//           try {
//             const contents =  fs.readFileSync(filePath, 'utf-8');

//             const result = contents.includes(str);
//             console.log("questionIsExist:", result);

//             return result;
//           } catch (err) {
//             console.log(err);
//           }
//         }

//         async function submitPracticeTest(questionId, number,callback) {
//           const apiUrl = submitPracticeTestUrl;
//           const postData = {
//             "question": questionId,
//             "user_response": `[[${number}]]`,
//             "user_response_ui": `[[${number}]]`,
//             "time_taken": 100
//           };
//           const headers = {
//             'authorization': `jwt ${cerebryToken}`,
//             'Content-Type': 'application/json'
//           };

//           axios.post(apiUrl, postData, { headers })
//             .then((response) => {
//               cerebryAnswerStatus = response.data.response; // Assign the response data to the variable
//               callback(cerebryAnswerStatus);
//             })
//             .catch((error) => {
//               console.error('Error making POST request:', error.message);
//             });

//         }

//         // Then call getPracticetest
//         getPracticetest(() => {
//           const questionId = cerebryQuestionId

//           // If the questionId exist, check if the correct answer existed
//           if (checkIfContains(filePath, questionId)) {
//             fs.readFile(filePath, 'utf-8', (err, data) => {
//               if (err) {
//                 console.error('Error reading file:', err);
//                 return;
//               }

//               // If the correct answer NOT existed, check the incorrect to submit with the next index
//               try {
//                 const jsonData = JSON.parse(data);
//                 const questionIdString = questionId.toString(); // Convert the number to a string
//                 const isCorrect = jsonData.practiceTest.questions[questionIdString].answers.correctValue.length;
//                 if (isCorrect == 0) {
//                   const wrongAnswerIndex = jsonData.practiceTest.questions[questionIdString].answers.incorrectValues.length;

//                   submitPracticeTest(questionId, wrongAnswerIndex, () => {
//                     const answerStatus = cerebryAnswerStatus

//                     // If correct, then write the answer to the file
//                     if (answerStatus == 'RIGHT') {

//                       fs.readFile(filePath, 'utf-8', (err, data) => {
//                         if (err) {
//                           console.error('Error reading file:', err);
//                           return;
//                         }

//                         try {
//                           const jsonData = JSON.parse(data);

//                           jsonData.practiceTest.questions[questionIdString].answers.correctValue.push(wrongAnswerIndex);

//                           // Convert the modified JavaScript object back to JSON string
//                           const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

//                           // Step 4: Write the modified JSON back to the file
//                           fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
//                             if (err) {
//                               console.error('Error writing file:', err);
//                               return;
//                             }
//                             console.log('New entry added to the questions object in the JSON file.');
//                           });
//                         } catch (err) {
//                           console.error('Error parsing JSON:', err);
//                         }
//                       });
//                     }
//                     // If incorrect, then write the wrong answer to the file
//                     else {

//                       fs.readFile(filePath, 'utf-8', (err, data) => {
//                         if (err) {
//                           console.error('Error reading file:', err);
//                           return;
//                         }

//                         try {
//                           const jsonData = JSON.parse(data);

//                           jsonData.practiceTest.questions[questionIdString].answers.incorrectValues.push(wrongAnswerIndex);

//                           // Convert the modified JavaScript object back to JSON string
//                           const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

//                           // Step 4: Write the modified JSON back to the file
//                           fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
//                             if (err) {
//                               console.error('Error writing file:', err);
//                               return;
//                             }
//                             console.log('New entry added to the questions object in the JSON file.');
//                           });
//                         } catch (err) {
//                           console.error('Error parsing JSON:', err);
//                         }
//                       });
//                     }

//                   })

//                 }

//                 // If the correct answer existed, then end and go to the next round, need to setup the loop
//                 else {
//                   console.log('wait for the loop kk')
//                 }
//               } catch (err) {
//                 console.error('Error parsing JSON:', err);
//               }

//             });

//           // If the questionId NOT existed, then submit with answer 0
//           } else {
//             submitPracticeTest(questionId, number, () => {
//               const answerStatus = cerebryAnswerStatus

//               // If correct, then write the answer to the file
//               if (answerStatus == 'RIGHT') {

//                 fs.readFile(filePath, 'utf-8', (err, data) => {
//                   if (err) {
//                     console.error('Error reading file:', err);
//                     return;
//                   }

//                   try {
//                     const jsonData = JSON.parse(data);

//                     jsonData.practiceTest.questions[questionId] = {
//                       "thirdPartyTopicId": third_party_learing_point_id,
//                       "answers":{
//                         "correctValue": [0],
//                         "incorrectValues": []
//                       }
//                     };

//                     // Convert the modified JavaScript object back to JSON string
//                     const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

//                     // Step 4: Write the modified JSON back to the file
//                     fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
//                       if (err) {
//                         console.error('Error writing file:', err);
//                         return;
//                       }
//                       console.log('New entry added to the questions object in the JSON file.');
//                     });
//                   } catch (err) {
//                     console.error('Error parsing JSON:', err);
//                   }
//                 });
//               }
//               // If incorrect, then write the wrong answer to the file
//               else {

//                 fs.readFile(filePath, 'utf-8', (err, data) => {
//                   if (err) {
//                     console.error('Error reading file:', err);
//                     return;
//                   }

//                   try {
//                     const jsonData = JSON.parse(data);

//                     jsonData.practiceTest.questions[questionId] = {
//                       "thirdPartyTopicId": third_party_learing_point_id,
//                       "answers":{
//                         "correctValue": [],
//                         "incorrectValues": [0]
//                       }
//                     };

//                     // Convert the modified JavaScript object back to JSON string
//                     const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

//                     // Step 4: Write the modified JSON back to the file
//                     fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
//                       if (err) {
//                         console.error('Error writing file:', err);
//                         return;
//                       }
//                       console.log('New entry added to the questions object in the JSON file.');
//                     });
//                   } catch (err) {
//                     console.error('Error parsing JSON:', err);
//                   }
//                 });
//               }

//             })
//           }
//         })
//     });
//   }
// });
const numberOfIterations = 5;

async function executeLoop(iteration) {
  if (iteration > numberOfIterations) {
    // Exit the loop when the desired number of iterations is reached
    console.log('Loop completed.');
    return;
  }
  fs.access(filePath, fs.constants.F_OK, async (err) => {
    if (err) {
      const data = {
          "practiceTest": {
              "questions": {

              }
          }
        };
      const jsonData = JSON.stringify(data, null, 2);

      try {
      fs.writeFileSync(filePath, jsonData);
      console.log("File has been saved.");
      } catch (error) {
      console.error(err);
      }


    } else {

      // If the file already existed, call getCerebryToken
      myModule.getCerebryToken( async (responseData) => {
        const cerebryToken = responseData

        async function getPracticetest(callback) {
          try {
              const apiUrl = getPracticeTestUrl;

              const response = await axios.get(apiUrl, {
              headers: {
                  'authorization': `jwt ${cerebryToken}`
              }
              });

              cerebryQuestionId = response.data.question.id; // Assign the response data to the variable
              callback(cerebryQuestionId); // Call the callback function with the API data

          } catch (error) {
              console.error('Error making API call:', error.message)
          }
          }

          function checkIfContains(filePath, str) {
            try {
              const contents =  fs.readFileSync(filePath, 'utf-8');

              const result = contents.includes(str);
              console.log("questionIsExist:", result);

              return result;
            } catch (err) {
              console.log(err);
            }
          }

          async function submitPracticeTest(questionId, number,callback) {
            const apiUrl = submitPracticeTestUrl;
            const postData = {
              "question": questionId,
              "user_response": `[[${number}]]`,
              "user_response_ui": `[[${number}]]`,
              "time_taken": 100
            };
            const headers = {
              'authorization': `jwt ${cerebryToken}`,
              'Content-Type': 'application/json'
            };

            axios.post(apiUrl, postData, { headers })
              .then((response) => {
                cerebryAnswerStatus = response.data.response; // Assign the response data to the variable
                callback(cerebryAnswerStatus);
              })
              .catch((error) => {
                console.error('Error making POST request:', error.message);
              });

          }

          // Then call getPracticetest
            getPracticetest( async () => {
              const questionId = cerebryQuestionId

              // If the questionId exist, check if the correct answer existed
              if (checkIfContains(filePath, questionId)) {
                fs.readFileSync(filePath, 'utf-8', (err, data) => {
                  if (err) {
                    console.error('Error reading file:', err);
                    return;
                  }

                  // If the correct answer NOT existed, check the incorrect to submit with the next index
                  try {
                    const jsonData = JSON.parse(data);
                    const questionIdString = questionId.toString(); // Convert the number to a string
                    const isCorrect = jsonData.practiceTest.questions[questionIdString].answers.correctValue.length;
                    if (isCorrect == 0) {
                      const wrongAnswerIndex = jsonData.practiceTest.questions[questionIdString].answers.incorrectValues.length;

                      submitPracticeTest(questionId, wrongAnswerIndex, () => {
                        const answerStatus = cerebryAnswerStatus

                        // If correct, then write the answer to the file
                        if (answerStatus == 'RIGHT') {

                          fs.readFile(filePath, 'utf-8', (err, data) => {
                            if (err) {
                              console.error('Error reading file:', err);
                              return;
                            }

                            try {
                              const jsonData = JSON.parse(data);

                              jsonData.practiceTest.questions[questionIdString].answers.correctValue.push(wrongAnswerIndex);

                              // Convert the modified JavaScript object back to JSON string
                              const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

                              // Step 4: Write the modified JSON back to the file
                              fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
                                if (err) {
                                  console.error('Error writing file:', err);
                                  return;
                                }
                                console.log('New entry added to the questions object in the JSON file.');
                              });
                            } catch (err) {
                              console.error('Error parsing JSON:', err);
                            }
                          });
                        }
                        // If incorrect, then write the wrong answer to the file
                        else {

                          fs.readFile(filePath, 'utf-8', (err, data) => {
                            if (err) {
                              console.error('Error reading file:', err);
                              return;
                            }

                            try {
                              const jsonData = JSON.parse(data);

                              jsonData.practiceTest.questions[questionIdString].answers.incorrectValues.push(wrongAnswerIndex);

                              // Convert the modified JavaScript object back to JSON string
                              const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

                              // Step 4: Write the modified JSON back to the file
                              fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
                                if (err) {
                                  console.error('Error writing file:', err);
                                  return;
                                }
                                console.log('New entry added to the questions object in the JSON file.');
                              });
                            } catch (err) {
                              console.error('Error parsing JSON:', err);
                            }
                          });
                        }

                      })

                    }

                    // If the correct answer existed, then end and go to the next round, need to setup the loop
                    else {
                      console.log('wait for the loop kk')
                    }
                  } catch (err) {
                    console.error('Error parsing JSON:', err);
                  }

                });

              // If the questionId NOT existed, then submit with answer 0
              } else {
                submitPracticeTest(questionId, number, () => {
                  const answerStatus = cerebryAnswerStatus

                  // If correct, then write the answer to the file
                  if (answerStatus == 'RIGHT') {

                    fs.readFileSync(filePath, 'utf-8', (err, data) => {
                      if (err) {
                        console.error('Error reading file:', err);
                        return;
                      }

                      try {
                        const jsonData = JSON.parse(data);

                        jsonData.practiceTest.questions[questionId] = {
                          "thirdPartyTopicId": third_party_learing_point_id,
                          "answers":{
                            "correctValue": [0],
                            "incorrectValues": []
                          }
                        };

                        // Convert the modified JavaScript object back to JSON string
                        const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

                        // Step 4: Write the modified JSON back to the file
                        fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
                          if (err) {
                            console.error('Error writing file:', err);
                            return;
                          }
                          console.log('New entry added to the questions object in the JSON file.');
                        });
                      } catch (err) {
                        console.error('Error parsing JSON:', err);
                      }
                    });
                  }
                  // If incorrect, then write the wrong answer to the file
                  else {

                    fs.readFile(filePath, 'utf-8', (err, data) => {
                      if (err) {
                        console.error('Error reading file:', err);
                        return;
                      }

                      try {
                        const jsonData = JSON.parse(data);

                        jsonData.practiceTest.questions[questionId] = {
                          "thirdPartyTopicId": third_party_learing_point_id,
                          "answers":{
                            "correctValue": [],
                            "incorrectValues": [0]
                          }
                        };

                        // Convert the modified JavaScript object back to JSON string
                        const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument (2) adds indentation for better readability

                        // Step 4: Write the modified JSON back to the file
                        fs.writeFile(filePath, updatedJsonData, 'utf-8', (err) => {
                          if (err) {
                            console.error('Error writing file:', err);
                            return;
                          }
                          console.log('New entry added to the questions object in the JSON file.');
                        });
                      } catch (err) {
                        console.error('Error parsing JSON:', err);
                      }
                    });
                  }

                })
              }
              await executeLoop(iteration + 1);
            })
      });
    }
  })
}

executeLoop(1)
