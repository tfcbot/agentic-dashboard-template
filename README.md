# agentic-dashboard

This project is built using [SSTv3](https://sst.dev/) and [Next.js](https://nextjs.org/).

It uses app router and tailwindcss for styling. 

## Prerequisites

- Node.js 18 or later
- npm or yarn
- AWS Credentials Configured
- Export your AWS profile 

    ```
    export AWS_PROFILE=<ProfileName>
    ```

## Getting Started

1. Clone the repository:
   ```
   git clone <repo-url>
   cd agentic-landing-page
   ```

2. Initialize SST in the project
   ```
   npx sst@latest init
   ```

3. Start the development server:
   ```
   npx sst dev
   ```

## Deployment

Deploy to your desired stage

```
npx sst deploy --stage your-stage-name
```

## Note
This is a reference implementation meant for starting a new dashboard project. As of now there are no plans to add addtional features or integrations.

Please do not use this directly in production without testing and ensuring it meets your needs. 

Do not submit any PRs or issues for this repository. 
