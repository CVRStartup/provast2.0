import Image from "next/image";

export const Questionnaire = ({ job }) => {
  console.log(job.questionnaire);
  return (
    <div className='px-28'>
      {job && job.questionnaire && job.questionnaire.length > 0 ? (
        <div>
          {job.questionnaire.map((questionObj, index) => (
            <div className='m-5' key={index}>
              <h2 className='text-xl font-semibold'>Question {index + 1}:</h2>
              <div className='flex justify-between items-center'>
                <div className='w-[80%]'>
                  <span className='text-md font-semibold'>{questionObj.question.questionName}</span>
                  <span className='text-xs ml-2 text-orange-500'>
                    ({questionObj.question.required ? "Required" : "Optional"})
                  </span>
                </div>
                <div className='text-sm'>
                  <span className='font-semibold'>Question type:</span>
                  <span className='ml-2 text-gray-800'>
                    {questionObj.question.options && questionObj.question.options.length > 0
                      ? "MCQ"
                      : "Text"}
                  </span>
                </div>
              </div>

              {questionObj.question.options && questionObj.question.options.length > 0 ? (
                <div className='text-sm mt-1'>
                  Options:
                  {questionObj.question.options.map((option, index) => (
                    <div className='my-1' key={index}>
                      {index + 1}. {option}
                    </div>
                  ))}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className='pt-4 flex flex-col'>
          <article className='flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='relative flex-shrink-0 flex justify-center h-40 w-40 mx-auto'>
              <Image
                placeholder='blur'
                blurDataURL='/no_results.png'
                layout='fill'
                objectFit='contain'
                src='/no_results.png'
                alt=''
              />
            </div>
            <div className='py-4'>
              <div className='text-center'>
                <h1 className='mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl'>
                  Questionnaire Not Found.
                </h1>
                <p className='mt-2 text-base text-gray-500'>
                  Seems like no questionnaire posted for this job.
                </p>
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
};
