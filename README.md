# Student Pulse Monitor

Build a Hackathon-Ready Prototype: "School Pulse"

Build a polished, modern, fully interactive web prototype called School Pulse.

1. Product Concept

School Pulse is an anonymous student mental-health early-warning platform for schools.

The core idea:

Students anonymously share what is causing them stress. Schools see aggregated insights — never individual student identities — so they can identify emerging problems and intervene before they become serious.

Example insight:

42% of students report high stress related to exams.

The school can then take preventive action, such as providing exam-stress workshops, improving study support, or increasing counselor outreach.

This is a hackathon prototype, so use realistic mock data instead of a real backend or real student data.

2. Core User Journey

Create two experiences:

Student

Check in → Answer anonymously → See personal stress indicator → Receive supportive resources

School

Dashboard → Identify trends → Understand major stressors → Take preventive action → Track changes

The experience should clearly communicate:

Student Voice → Anonymous Data → School Insight → Early Intervention

3. Brand Identity

Product name:

School Pulse

Tagline:

Hear the pressure before it becomes a problem.

Alternative supporting message:

Anonymous student insights. Actionable school-wide mental health signals.

The brand should feel:

Safe

Trustworthy

Youth-friendly

Modern

Calm

Human

Professional

Suitable for schools

Suitable for a global hackathon

Avoid making it look like a hospital or clinical medical platform.

4. Visual Design

Use a clean, premium SaaS-style interface with a warm mental-health feel.

Color palette

Primary blue:
#2563EB

Teal:
#14B8A6

Background:
#F8FAFC

White:
#FFFFFF

Dark text:
#0F172A

Muted text:
#64748B

Success:
#22C55E

Warning:
#F59E0B

Danger:
#EF4444

Use blue and teal as the main brand colors.

Keep the interface spacious with generous whitespace, rounded cards, subtle shadows, and clear typography.

5. Typography

Use a modern, highly readable font.

Prefer:

Inter

The interface should look excellent on both desktop and mobile.

6. Logo

Create a simple text-based logo:

School Pulse

Add a minimal pulse/wave icon inspired by a heartbeat, but keep it abstract and friendly.

Do not use a medical cross.

Under the logo, optionally show:

Hear the pressure before it becomes a problem.

7. Landing Page

Create a polished landing page.

Hero section

Large headline:

Hear the pressure before it becomes a problem.

Supporting text:

School Pulse gives students a safe, anonymous way to share what is stressing them — while giving schools aggregated insights to identify problems early and respond proactively.

Primary CTA:

Check In Anonymously

Secondary CTA:

Explore School Dashboard

Add a visual preview of the dashboard on the right side.

How it works

Create four steps:

01 — Students Check In

Students answer a few quick questions anonymously.

02 — Data Stays Private

Individual responses are never shown to the school.

03 — Schools See the Pulse

Aggregated data reveals emerging stress patterns.

04 — Schools Act Early

Counselors and administrators can respond before problems escalate.

Represent these steps visually with icons and connecting lines.

8. Privacy Section

Create a strong section titled:

Privacy isn't a feature. It's the foundation.

Show three cards:

Anonymous

No student names are displayed in the school dashboard.

Aggregated

Schools only see patterns and percentages across groups.

Early Support

The goal is prevention and support — not diagnosis or surveillance.

Add a privacy badge:

🔒 Anonymous & Aggregated

Include a small explanation:

School Pulse is designed to help schools understand student needs without exposing individual student responses.

9. Student Experience

Create a dedicated student flow.

The student should NOT need to create an account.

Student Welcome Screen

Display:

How are you feeling lately?

Text:

This check-in is anonymous and takes less than one minute.

Primary button:

Start Check-In

Small privacy note:

🔒 Your individual answers are not shared with your school.

10. Student Privacy Explanation

Before the questionnaire, show:

Your privacy comes first

Three short statements:

Your name is not required.

Your school sees aggregated trends, not individual answers.

Your responses help identify areas where students may need more support.

Add:

This tool is not a medical or psychological diagnosis.

Button:

I Understand — Start

11. Stress Level Question

Question:

How much stress have you been feeling recently?

Use five large interactive options:

😌 Very Low

🙂 Low

😐 Moderate

😟 High

😣 Very High

Display a progress indicator:

Question 1 of 3

When the user selects an answer, visually highlight the selected card.

Then allow them to continue.

12. Main Stressors

Question:

What is causing you the most stress?

Allow multiple selections.

Options:

📚 Exams

📖 Academic workload

🤝 Relationships

🚫 Bullying

🎯 Future / Career

🏠 Personal life

💬 Something else

Button:

Continue

13. Timing Question

Question:

When do you feel the most pressure?

Options:

Before exams

During exams

When assignments pile up

When dealing with classmates

When thinking about the future

Most of the time

I'm not sure

Button:

See My Results

14. Student Results

Do NOT diagnose the student.

Instead show:

Your Stress Indicator

Example:

72 / 100

Label:

High

Use a beautiful circular progress indicator.

Supportive message:

It sounds like you've been dealing with a lot of pressure lately. You don't have to handle everything alone.

Then show personalized cards based on their selected stressors.

Example Support Cards

If exams were selected:

Preparing for exams

Break large study tasks into smaller steps and take regular short breaks.

If bullying was selected:

You deserve to feel safe

Consider talking to a trusted adult, teacher, counselor, or someone you feel comfortable with.

If future/career was selected:

One step at a time

You don't need to figure out your entire future today. Focus on the next step you can control.

Do not provide medical advice.

15. Student Completion Screen

Show a friendly success animation.

Headline:

Thank you for speaking up. 💙

Text:

Your anonymous response helps your school understand what students are experiencing.

Show:

🔒 Your response was submitted anonymously.

Button:

Done

16. School Login

Create a simple school login page.

Title:

School Pulse Dashboard

Fields:

Email

Password

Primary button:

Sign In

Also include:

Try Demo Dashboard

This should bypass authentication and open the dashboard using mock data.

No real authentication backend is required.

17. School Dashboard

This is the most important screen for the hackathon demo.

Title:

School Pulse

Subtitle:

Anonymous student wellbeing insights

At the top, show:

🔒 Anonymous & Aggregated Data

18. KPI Cards

Create four prominent metric cards:

Student Check-ins

1,248

This week

Average Stress

61%

+4% vs last week

High Stress

42%

+8% vs last week

Students Reporting Exam Stress

42%

Main emerging signal

Use subtle trend indicators.

19. Main Stress Trend Chart

Create an interactive line chart:

Title:

Stress Levels — Last 7 Days

Mock data:

DayStressMonday54%Tuesday57%Wednesday59%Thursday61%Friday66%Saturday63%Sunday61%

Use Recharts.

Add hover tooltips.

Animate the chart when it loads.

20. Stress Sources Chart

Create an interactive donut chart:

Title:

What is stressing students most?

Mock data:

Exams — 42%

Academic workload — 25%

Future / Career — 13%

Relationships — 9%

Bullying — 7%

Other — 4%

When a segment is clicked, show a small detail panel.

Example:

Exams — 42%

Exams are currently the largest reported source of stress.

21. Early Warning Section

Create a highly visible section:

⚠️ Emerging Signals

Card 1:

Exam Stress

42%

Trend:

↑ 8%

Message:

Exam-related stress is increasing compared with last week.

Button:

View Insight

Card 2:

Academic Workload

25%

Trend:

↑ 3%

Message:

Academic workload remains one of the top reported stressors.

Button:

View Insight

Card 3:

Bullying

7%

Trend:

Stable

Message:

Reported bullying-related stress remains relatively stable.

Button:

View Insight

22. Insight Detail Page

When the user clicks View Insight for Exam Stress, open a detailed page.

Title:

Exam Stress

Show:

Current Level

42%

Previous Week

34%

Change

+8 percentage points

Create a comparison chart.

When does exam stress peak?

Show:

Before exams:
58%

During exams:
31%

After exams:
11%

23. Recommended Actions

On the insight page, show:

Possible Preventive Actions

Create cards:

Exam Preparation Workshop

Help students learn study planning and stress-management strategies.

Button:

Add Action

Study Planning Resources

Provide students with practical planning resources before exam periods.

Button:

Add Action

Counselor Outreach

Increase awareness of available school counseling resources.

Button:

Add Action

These are recommendations only and should not imply medical treatment.

24. Action Tracking

Create an Interventions page.

Example:

Exam Preparation Workshop

Status:

🟡 Planned

Goal:

Reduce exam-related stress.

Created:

Today

Buttons:

Mark as Active

Mark as Completed

When clicking "Mark as Active", change the status to:

🟢 Active

Show a toast notification:

Action marked as active.

25. Trends Page

Create a page called:

Trends

Allow the user to select:

Last 7 days

Last 30 days

This semester

Display:

Average stress

High-stress percentage

Number of check-ins

Top stressors

Use interactive charts.

26. Privacy Protection in Dashboard

This is extremely important.

Never display individual student responses.

Add a persistent privacy indicator:

🔒 Privacy Protected

Clicking it opens a modal:

School Pulse only displays aggregated insights. Individual student identities and individual responses are not visible to school administrators.

27. Minimum Group Size Protection

Implement a privacy rule in the prototype:

If a category contains fewer than 10 responses, do NOT show the percentage.

Instead display:

Not enough responses to display this insight.

And:

We hide small groups to help protect student privacy.

This should be demonstrated somewhere in the dashboard because it is an important part of the product's privacy design.

28. Mock Data

Use realistic fictional data.

School:

Riverside High School

Students:

2,950

Weekly check-ins:

1,248

Average stress:

61%

High stress:

42%

Stress sources:

Exams: 42%
Academic workload: 25%
Future / Career: 13%
Relationships: 9%
Bullying: 7%
Other: 4%


No real names.

No real student records.

No personally identifiable information.

29. Smart Prototype Behavior

Make the prototype feel intelligent.

If a student selects Exams, the results should prioritize exam-related support.

If they select Bullying, show safety/support resources.

If they select Academic Workload, show workload-management suggestions.

If they select Future / Career, show future-planning support.

The dashboard should dynamically display the selected time period.

Charts should update when filters change.

30. Empty States

Design polished empty states.

Example:

Not enough data yet

We need more anonymous responses before showing this insight.

Secondary text:

This protects student privacy while ensuring the data remains useful.

31. Responsive Design

The product must be fully responsive.

Mobile

Optimize primarily for the student experience.

Use large touch targets and simple navigation.

Desktop

Optimize primarily for the school dashboard.

Use a sidebar navigation and larger data visualizations.

32. Navigation

Student Navigation

Keep it extremely minimal:

Home

Check-In

Privacy

School Navigation

Sidebar:

Overview

Stressors

Trends

Insights

Interventions

Privacy

Settings

Include a profile/demo school indicator.

33. Micro-interactions

Use subtle animations:

Fade-in page transitions

Card hover states

Progress animations

Chart animations

Button feedback

Toast notifications

Success check animation

Smooth modal transitions

Keep animations professional and subtle.

34. Technology

Use:

React

TypeScript

Tailwind CSS

shadcn/ui

Recharts

Lucide icons

Create reusable components.

Keep the architecture clean and easy to extend later with a real backend.

35. Important Product Principles

The product should communicate these principles throughout the experience:

1. Anonymous by design

Students should feel safe sharing.

2. Aggregated insights

Schools see trends, not individual students.

3. Early intervention

The goal is to identify problems before they escalate.

4. Support, not diagnosis

School Pulse is not a medical diagnostic tool.

5. Student voice

Students help schools understand what is happening inside the school community.

36. Hackathon Demo Story

Optimize the prototype for a 2–3 minute live demo.

The ideal demo flow is:

Step 1

Open the student experience.

Step 2

Student anonymously reports:

High stress → Exams → Before exams

Step 3

Show personalized supportive feedback.

Step 4

Switch to the School Dashboard.

Step 5

Show:

42% of students report exam-related stress.

Step 6

Show that the trend increased by 8%.

Step 7

Click:

View Insight

Step 8

Show recommended preventive actions.

Step 9

Activate:

Exam Preparation Workshop

Final message:

School Pulse turns anonymous student voices into early action.

Make this journey extremely smooth and visually impressive.

37. Final UI Quality Bar

The final prototype should look like a real startup product rather than a generic dashboard template.

Prioritize:

Strong visual identity

Excellent UX

Privacy-first design

Clear storytelling

Beautiful data visualization

Responsive layouts

Smooth interactions

Strong hackathon demo flow

Build the entire prototype end-to-end and make all major buttons, navigation links, charts, filters, modals, and interactions functional using mock data.

Start with the landing page, then build the student experience, then the school dashboard, and finally connect all flows together.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://school-wellbeing-insight.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4e675ee0-16d5-42ba-ad00-333a4d343c3b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
