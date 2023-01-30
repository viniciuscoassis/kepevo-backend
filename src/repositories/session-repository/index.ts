import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

function createSession(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}
const sessionRepository = {
  createSession,
};
export default sessionRepository;
