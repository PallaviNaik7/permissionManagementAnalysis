module.exports.processMessages = async function (body, models, messageId) {
  console.log("BODY:", body);
  let env = body.env;
  let version = 0;
  let permissionAddedCount = 0;
  let permissionDeletedCount = 0;
  let accessorId = 0;
  let accessPointId = 0;
  let msgData = body.data;
  let integratorId = msgData.integratorId;

  //   switch (msgType){

  //     case "createAccessor":

  //         queueMesaage = {
  //           msgVersion: 1,
  //           msgType: "createAccessor",
  //           data:{
  //             accessorId: id,
  //             integratorId:integratorId,
  //             permissionsToAdd: body.permissionsToAdd,
  //             accessMode: body.accessMode,
  //             createdAt: time
  //           }
  //         }
  //         break;
  //     case "updateAccessorPermission":

  //       queueMesaage = {
  //         msgVersion: 1,
  //         msgType: "updateAccessorPermission",
  //         data:{
  //           accessorId: id,
  //           permissionsToAdd: body.permissionsToAdd,
  //           permissionsToRemove: body.permissionsToRemove
  //         }
  //       }

  //         break;
  //     case "updateAccessPointPermission":

  //       queueMesaage = {
  //         msgVersion: 1,
  //         msgType: "updateAccessPointPermission",
  //         data:{
  //           accessPointId: id,
  //           permissionsToAdd: body.permissionsToAdd,
  //           permissionsToRemove: body.permissionsToRemove
  //         }
  //       }

  //         break;
  //     case "deleteAccessor":

  //        queueMesaage = {
  //          msgVersion: 1,
  //          msgType: "deleteAccessor",
  //          data:{
  //            accessorId: id,
  //            integratorId:integratorId,
  //            deletedAt:time
  //           }
  //         }

  //         break;
  //     default:
  //   }

  if (body.msgType == "createAccessor") {
    version = body.msgVersion;
    accessorId = msgData.accessorId;
    permissionAddedCount = msgData.permissionsToAdd.length;
  } else if (body.msgType == "updateAccessorPermission") {
    version = body.msgVersion;
    accessorId = msgData.accessorId;
    permissionAddedCount = msgData.permissionsToAdd.length;
    permissionDeletedCount = msgData.permissionsToRemove.length;
  } else if (body.msgType == "updateAccessPointPermission") {
    version = body.msgVersion;
    accessPointId = msgData.accessPointId;
    permissionAddedCount = msgData.permissionsToAdd.length;
    permissionDeletedCount = msgData.permissionsToRemove.length;
  } else {
    throw new Error(`NOT SUPPORTED`);
  }

  console.log(
    messageId,
    env,
    version,
    body.msgType,
    integratorId,
    accessorId,
    accessPointId,
    permissionAddedCount,
    permissionDeletedCount
  );

  await models.sequelize.query(
    `INSERT INTO permissions_api_counts (id,"messageId",env,"msgVersion","msgType","integratorId","accessorId","accessPointId","permissionsAddedCount","permissionsRemovedCount","createdAt","updatedAt") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8,$9,now(),now())`,
    {
      bind: [
        messageId,
        env,
        version,
        body.msgType,
        integratorId,
        accessorId,
        accessPointId,
        permissionAddedCount,
        permissionDeletedCount,
      ],
    }
  );
};
