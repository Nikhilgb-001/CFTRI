// import Excel from "exceljs";

// export const generateExcelReport = async (users) => {
//   const workbook = new Excel.Workbook();
//   const worksheet = workbook.addWorksheet("Coordinator Report");

//   // Coordinator sheet headers
//   worksheet.columns = [
//     { header: "Name", key: "name", width: 30 },
//     { header: "Email", key: "email", width: 30 },
//     { header: "Assigned Task", key: "task", width: 40 },
//     { header: "Task Status", key: "status", width: 15 },
//     { header: "Start Date", key: "startDate", width: 15 },
//     { header: "End Date", key: "endDate", width: 15 },
//     { header: "Completion Date", key: "completionDate", width: 15 },
//   ];

//   users.forEach((user) => {
//     worksheet.addRow({
//       name: user.name,
//       email: user.email,
//       task: user.assignedTask || "N/A",
//       status: user.taskStatus || "N/A",
//       startDate: user.taskStartDate
//         ? new Date(user.taskStartDate).toLocaleDateString()
//         : "N/A",
//       endDate: user.taskEndDate
//         ? new Date(user.taskEndDate).toLocaleDateString()
//         : "N/A",
//       completionDate: user.taskCompletedAt
//         ? new Date(user.taskCompletedAt).toLocaleDateString()
//         : "N/A",
//     });
//   });

//   return workbook.xlsx.writeBuffer();
// };

// export const generateTechTransferReport = async (docs) => {
//   const wb = new Excel.Workbook();
//   const ws = wb.addWorksheet("Annual Tech Transfer");

//   ws.columns = [
//     { header: "Name of the Technology", key: "techName", width: 30 },
//     { header: "Year of Development", key: "yearDev", width: 15 },
//     { header: "Premia (Cost)", key: "premia", width: 15 },
//     { header: "Product Information (PI)", key: "pi", width: 30 },
//     { header: "Member", key: "member", width: 25 },
//     { header: "License Details", key: "license", width: 40 },
//   ];

//   docs.forEach((doc) => {
//     // assume the *first* flow.step is your “technology name”,
//     // and you stored yearDev, premia, pi in the flow.details or in user model.
//     const techName = doc.flows[0]?.step || "";
//     const yearDev = doc.flows[1]?.step || ""; // or pull from details
//     const premia = doc.flows[2]?.details || ""; // if you used details to store cost
//     const pi = doc.flows[3]?.details || "";
//     const member = doc.coordinator.name;
//     const license = `${doc.coordinator.onboarding?.details?.address || ""} — ${
//       doc.coordinator.onboarding?.details?.contact || ""
//     }`;

//     ws.addRow({ techName, yearDev, premia, pi, member, license });
//   });

//   return wb.xlsx.writeBuffer();
// };

import Excel from "exceljs";

// ── A) Coordinator report (your existing code) ──
export const generateExcelReport = async (users) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Coordinator Report");

  worksheet.columns = [
    { header: "Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 30 },
    { header: "Assigned Task", key: "task", width: 40 },
    { header: "Task Status", key: "status", width: 15 },
    { header: "Start Date", key: "startDate", width: 15 },
    { header: "End Date", key: "endDate", width: 15 },
    { header: "Completion Date", key: "completionDate", width: 15 },
  ];

  users.forEach((user) => {
    worksheet.addRow({
      name: user.name,
      email: user.email,
      task: user.assignedTask || "N/A",
      status: user.taskStatus || "N/A",
      startDate: user.taskStartDate
        ? new Date(user.taskStartDate).toLocaleDateString()
        : "N/A",
      endDate: user.taskEndDate
        ? new Date(user.taskEndDate).toLocaleDateString()
        : "N/A",
      completionDate: user.taskCompletedAt
        ? new Date(user.taskCompletedAt).toLocaleDateString()
        : "N/A",
    });
  });

  return workbook.xlsx.writeBuffer();
};

// ── B) Tech-Transfer report util ──
export const generateTechTransferReport = async (flows) => {
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet("Annual Tech Transfer");

  ws.columns = [
    { header: "Name of the Technology", key: "techName", width: 30 },
    { header: "Year of Development", key: "yearDev", width: 15 },
    { header: "Premia (Cost)", key: "premia", width: 15 },
    { header: "Product Information (PI)", key: "pi", width: 30 },
    { header: "Member", key: "member", width: 25 },
    { header: "License Details", key: "license", width: 40 },
  ];

  console.log(flows);

  flows.forEach((flow) => {
    const techName = flow.steps[0]?.name || "";
    const yearDev = flow.steps[1]?.date
      ? new Date(flow.steps[1].date).getFullYear().toString()
      : "";
    const premia = flow.steps[2]?.details || "";
    const pi = flow.steps[3]?.details || "";
    // const member = flow.dean?.name || "";
    // const license = flow.dean?.onboarding?.details
    //   ? `${flow.dean.onboarding.details.address} — ${flow.dean.onboarding.details.contact}`
    //   : "";

    const member = flow.steps.find((s) => s.name === "Member")?.details || "";
    const license =
      flow.steps.find((s) => s.name === "License Details")?.details || "";

    ws.addRow({ techName, yearDev, premia, pi, member, license });
  });

  return wb.xlsx.writeBuffer();
};
