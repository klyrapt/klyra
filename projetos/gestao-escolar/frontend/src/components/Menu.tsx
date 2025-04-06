"use client";

import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: "/home.png", label: "Home", href: "/", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/teacher.png", label: "Professores", href: "/list/teachers", visible: ["admin", "teacher"] },
      { icon: "/student.png", label: "Alunos", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: "/parent.png", label: "Pais", href: "/list/parents", visible: ["admin", "teacher"] },
      { icon: "/subject.png", label: "Disciplinas", href: "/list/subjects", visible: ["admin"] },
      { icon: "/class.png", label: "Turmas", href: "/list/turmas", visible: ["admin", "teacher"] },
      { icon: "/lesson.png", label: "Aulas", href: "/list/lessons", visible: ["admin", "teacher"] },
      { icon: "/exam.png", label: "Provas", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/assignment.png", label: "Tarefas", href: "/list/assignments", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/result.png", label: "Resultados", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/attendance.png", label: "Presença", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/calendar.png", label: "Eventos", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/message.png", label: "Mensagens", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/announcement.png", label: "Avisos", href: "/list/announcements", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
  
  {
    title: "OUTROS",
    items: [
      { icon: "/profile.png", label: "Perfil", href: "/perfil", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/setting.png", label: "Configuração", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
      { icon: "/logout.png", label: "Sair", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
];

const Menu = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const confirmar = confirm("Deseja realmente sair?");
    if (!confirmar) return;

    const refreshToken = Cookies.get("refreshToken");
    try {
      if (refreshToken) {
        await axios.post("http://localhost:8000/api/auth/logout/", {
          refresh_token: refreshToken,
        });
      }
    } catch (error) {
      console.warn("Erro ao deslogar:", error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("usuario");

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    router.push("/sign-in");
  };

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {section.title}
          </span>
          {section.items.map((item) => {
            if (!item.visible.includes(role)) return null;

            if (item.label === "Sair") {
              return (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight w-full text-left"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                href={item.href}
                key={item.label}
                className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
