import cssModule from "./ValidationErrors.module.css"
export const ValidationErrors = ({errors}) => {

    let arrayOfErrorsText = [];
    for (let error in errors)
    {
        arrayOfErrorsText.push(errors[error]);
    }

    return (
      <div>
          {
              arrayOfErrorsText.map(x => {
                  return (
                      <div key={x} className={cssModule.errorMessage}>
                        {x}
                      </div>
                  );
              })
          }
      </div>
    );
};