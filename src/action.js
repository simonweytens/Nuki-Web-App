export default function lockAction(x, LockIcon, UnLockIcon, element){
    if(x.src == UnLockIcon){
        x.src = LockIcon
        console.log(LockIcon, "Locked")
        element.innerHTML = "Locked"
    }
    else if(x.src == LockIcon){
        x.src = UnLockIcon
        console.log(UnLockIcon, "Unlocked")
        element.innerHTML = "Unlocked"
    }
}