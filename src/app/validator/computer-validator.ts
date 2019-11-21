import { Computer } from 'app/model/computer.model'



function check_date(introducedStr: string, discontinuedStr: string): boolean {

    const today = Date.now()
    // Birth day of the first programmable computer
    const earliest = new Date(1938, 1, 1)
    const date_range_err = "Date cannot be later than today or earlier than 1938-01-01"

    let introduced: any, discontinued: any

    if (introducedStr) {
        introduced = new Date(introducedStr)
        if (introduced > today || introduced < earliest) {
            alert(date_range_err)
            return false
        }
    }

    if (discontinuedStr) {
        discontinued = new Date(discontinuedStr)
        if (discontinued > today || discontinued < earliest) {
            alert(date_range_err)
            return false
        }
        if (introduced && introduced > discontinued) {
            alert("Introduced date cannot be later than discontinued date")
            return false
        }
    }
    return true
}

function validate(name: string, introduced: string, discontinued: string): boolean {
    // Name cannot be empyt string
    if (!name) {
        alert("Name cannot be empty!")
        return false
    }

    return check_date(introduced, discontinued)
}


export function checkComputer(computer: Computer): boolean {
    return validate(computer.name, computer.introduced, computer.discontinued)
}