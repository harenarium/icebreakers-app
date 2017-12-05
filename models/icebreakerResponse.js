const db = require("../config/db.js")
const crypto = require('crypto');

class IcebreakerResponse{
  static CreateTable() {
    const sql = `CREATE TABLE IF NOT EXISTS icebreaker_responses (
      id INTEGER PRIMARY KEY, 
      icebreaker_id INTEGER,
      question_id INTEGER,
      email TEXT,
      secret TEXT,
      response_content TEXT
    )`
    return new Promise(function(resolve){
      db.run(sql, function(){
        console.log("icebreakerResponses table created")
        resolve("icebreakerResponses table created")
      })
    })
  }

//   constructor(content){  // seems site controler is handeling this
//     this.content = content
//   }

//sub in correct columns. crypto 50:30 into part2
  insert(){
    const self = this
    const sql = `INSERT INTO icebreaker_responses (icebreaker_id, question_id, secret, email) VALUES (?, ?, ?, ?)`
    this.secret = crypto.randomBytes(10).toString('hex')

    return new Promise(function(resolve){
      db.run(sql, [self.icebreakerID, self.questionID, self.secret, self.email], function(err, result){
        self.id = this.lastID
        resolve(self)
      })
    })
  }

  updateResponseContent(responseContent){
    const self = this  //dont need?
    const sql = `UPDATE icebreaker_responses SET response_content = ? WHERE id = ?`
    self.responseContent = responseContent
    return new Promise(function(resolve){
      db.run(sql, [self.responseContent, self.id], function(err, result){
        resolve(self)
      })
    })

  }

  static BatchCreateForIcebreaker(icebreaker, emails){
    //get array of emails, for each email we need to create row in db. it requires icebreaker id from icebreaker
    //and needs to generate a secret for that reponse for that person so that we can link to it.
  
    emails.forEach(async function(email){
      const icebreakerResponse = new IcebreakerResponse()
      icebreakerResponse.email = email
      icebreakerResponse.questionID = icebreaker.questionID
      icebreakerResponse.icebreakerID = icebreaker.id //secret in insert statement
      await icebreakerResponse.insert()
    })

  }


  static FindAllByIcebreakerID(icebreakerID){
    const sql = "select * FROM icebreaker_responses WHERE icebreaker_id = ?"

    return new Promise(function(resolve){
      db.all(sql, icebreakerID,function(err, results){ 
          let icebreakerResponses = results.map(function(row){
            let icebreakerResponse = new IcebreakerResponse()
            icebreakerResponse.questionID = row.question_id
            icebreakerResponse.icebreakerID = row.icebreaker_id
            icebreakerResponse.email = row.email
            icebreakerResponse.secret = row.secret
            icebreakerResponse.id = row.id
            icebreakerResponse.responseContent = row.response_content

            return icebreakerResponse
          })
        
        resolve(icebreakerResponses)
      })
    })
  }



  static FindBySecret(secret){
   const sql = "select * FROM icebreaker_responses WHERE secret = ?"

   return new Promise(function(resolve){
       db.get(sql, [secret], function(err, results){ //want tp ise db.get
         const icebreakerResponse = new IcebreakerResponse() //not IcebreakerResponse(results.content) b/c no contructor
         icebreakerResponse.id = results.id 
         icebreakerResponse.questionID = results.question_id
         icebreakerResponse.icebreakerID = results.icebreaker_id
         icebreakerResponse.email = results.email 
         icebreakerResponse.secret = results.secret 
         resolve(icebreakerResponse)
     })
   })
 }

 //  static Find(id){
 //   const sql = "select * FROM icebreakerResponses WHERE id = ?"

 //   return new Promise(function(resolve){
 //       db.get(sql, [id], function(err, results){ //want tp ise db.get
 //         const icebreakerResponse = new IcebreakerResponse() //not IcebreakerResponse(results.content) b/c no contructor
 //         icebreakerResponse.id = results.id 
 //         icebreakerResponse.content = results.content
 //         resolve(icebreakerResponse)
 //     })
 //   })
 // }

 //  static All(id){
	// 	const sql = "select * FROM icebreakerResponses"

	// 	return new Promise(function(resolve){
	// 	  db.all(sql, function(err, results){ 
 //          let icebreakerResponses = results.map(function(row){
 //            let q = new IcebreakerResponse()
 //            q.content = row.content
 //            q.id = row.id
 //            return q
 //          })
				
	// 			resolve(icebreakerResponses)
	// 	 	})
	// 	})
	// }


}

module.exports = IcebreakerResponse;
