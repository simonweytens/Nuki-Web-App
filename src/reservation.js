export default function resComponent( timeset){
    var form = `
                <div>
                    <h4>Schedule time</h4>
                </div>
                <div>
                    <label for="timeFrom">From: </label>
                    <input type="time" id="timeFrom" name="timeFrom>
                </div>
                <br>
                <div>
                    <label for="timeTill>Till: </label>
                    <input type="time" id="timeTill name="timeTill">
                </div>
                <br>
                <div>
                    <input type="submit" value="Submit">   
                </div>             
                `
    timeset.innerHTML = form
}